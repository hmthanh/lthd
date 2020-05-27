const db = require('../utils/db')
const schema = require('../utils/common').SQL_SCHEMA

const TranferToAccount = entity => new Promise((resolve, reject) => {
  db.getPool().getConnection((err, connection) => {
    if (err) throw err
    connection.beginTransaction((err) => {
      if (err) throw err
      connection.query(`SELECT ${schema.FEILD_NAME.BANKING_INFO.ID}, ${schema.FEILD_NAME.BANKING_INFO.SURPLUS} FROM ${schema.TABLE.BANKING_INFO} WHERE account_num=${entity.to_account} FOR UPDATE`, (error, results, fields) => {
        if (error)
          return connection.rollback(() => { throw error })
        let { surplus, id } = results[0]
        surplus = parseInt(surplus) + parseInt(entity.amount)
        connection.query(`UPDATE ${schema.TABLE.BANKING_INFO} SET ? WHERE ?`, [{ surplus: surplus }, { id: id }], (error, results, fields) => {
          if (error) return connection.rollback(() => { throw error })
          entity.surplus = surplus
          connection.query(`INSERT INTO ${schema.TABLE.TRANSACTION_TRANFER} SET ?`, entity, (error, results, fields) => {
            if (error) return connection.rollback(() => { throw error })
            connection.commit((err) => {
              if (err) return connection.rollback(() => { throw err })
              connection.release()
              resolve({
                tranId: results.insertId,
                accountNum: entity.to_account,
                amount: entity.amount, // đơn vị VND
              })
            })
          })
        })
      })
    })
  })
})


const TranferInternalBank = entity => new Promise((resolve, reject) => {
  db.getPool().getConnection((err, connection) => {
    if (err) throw err
    connection.beginTransaction((err) => {
      if (err) throw err
      connection.query(`SELECT ${schema.FEILD_NAME.BANKING_INFO.ID}, ${schema.FEILD_NAME.BANKING_INFO.SURPLUS} FROM ${schema.TABLE.BANKING_INFO} WHERE account_num=${entity.from_account} FOR UPDATE`, async (error, results, fields) => {
        if (error)
          return connection.rollback(() => { throw error })
        let { surplus, id } = results[0]
        if (parseInt(surplus) < parseInt(entity.amount)) {
          connection.release()
          resolve({
            error: -200,
            msg: 'số dư không đủ'
          })

        } else {
          // trừ tiền
          // console.log( parseInt(surplus), parseInt(entity.amount))
          let fromSurplus = parseInt(surplus) - parseInt(entity.amount)
          if(fromSurplus < 0) {
            connection.rollback(() => { throw error }) 
            return
          }
          connection.query(`UPDATE ${schema.TABLE.BANKING_INFO} SET ? WHERE ?`, [{ surplus: fromSurplus }, { id: id }], async (error, results, fields) => {
            // console.log(schema.TABLE.BANKING_INFO, results)
            if (error) return connection.rollback(() => { throw error })
            // entity.state = 0
            // entity.surplus = fromSurplus
            // console.log( entity)
            connection.query(`UPDATE ${schema.TABLE.TRANSACTION_TRANFER} SET ? WHERE ?`, [{ surplus: fromSurplus, state: 0, type: 2 }, { trans_id: entity.trans_id }], async (error, results, fields) => {
              // console.log(`UPDATE ${schema.TABLE.TRANSACTION_TRANFER}`, results)
              if (error) return connection.rollback(() => { throw error })
              // cộng tiền
              connection.query(`SELECT ${schema.FEILD_NAME.BANKING_INFO.ID}, ${schema.FEILD_NAME.BANKING_INFO.SURPLUS} FROM ${schema.TABLE.BANKING_INFO} WHERE account_num=${entity.to_account} FOR UPDATE`, async (error, results, fields) => {

                if (error) return connection.rollback(() => { throw error })
                // console.log(schema.FEILD_NAME.BANKING_INFO.ID, results)
                let { surplus, id } = results[0]
                let toSurplus = parseInt(surplus) + parseInt(entity.amount)
                connection.query(`UPDATE ${schema.TABLE.BANKING_INFO} SET ? WHERE ?`, [{ surplus: toSurplus }, { id: id }], async (error, results, fields) => {
                  if (error) return connection.rollback(() => { throw error })

                  let toEntity = {
                    surplus: toSurplus, state: 0, type: 1,
                    acc_name: entity.acc_name,
                    from_account: entity.to_account,
                    to_account: entity.from_account,
                    note: entity.note,
                    amount: entity.amount,
                    partner_code: 0,
                    timestamp: entity.timestamp,
                  }
                  let res = await db.add(toEntity, schema.TABLE.TRANSACTION_TRANFER)
                  connection.commit((err) => {
                    if (err) return connection.rollback(() => { throw err })
                    connection.release()
                    resolve({
                      tranId: res.insertId,
                      accountNum: entity.to_account,
                      amount: entity.amount, // đơn vị VND
                    })
                  })
                })
              })
            })
          })
        }
      })
    })
  })
})

const MinusTransfer = transaction =>new Promise((resolve, reject) => {
  db.getPool().getConnection((err, connection) => {
    if (err) throw err
    connection.beginTransaction((err) => {
      if (err) throw err
      connection.query(`SELECT ${schema.FEILD_NAME.BANKING_INFO.ID}, ${schema.FEILD_NAME.BANKING_INFO.SURPLUS} FROM ${schema.TABLE.BANKING_INFO} WHERE account_num=${transaction.from_account} FOR UPDATE`, async (error, results, fields) => {
        if (error) return connection.rollback(() => { throw error })
        else {
          let { surplus, id } = results[0]
          let fromSurplus = parseInt(surplus) - parseInt(transaction.amount)
          if(fromSurplus < 0) {
            connection.rollback(() => { throw error }) 
            return
          }
          connection.query(`UPDATE ${schema.TABLE.BANKING_INFO} SET ? WHERE ?`, [{ surplus: fromSurplus }, { id: id }], async (error, results, fields) => {
            transaction.state = 0
            transaction.surplus = fromSurplus
            let res = await db.patch(transaction, {trans_id: transaction.trans_id}, schema.TABLE.TRANSACTION_TRANFER)
            connection.commit((err) => {
              if (err) return connection.rollback(() => { throw err })
              connection.release()
              resolve({
                tranId: transaction.trans_id,
                accountNum: transaction.to_account,
                amount: transaction.amount, // đơn vị VND
              })
            })
          })
        }
      })
    })
  })
})


module.exports = {
  TranferToAccount,
  TranferInternalBank,
  MinusTransfer
}