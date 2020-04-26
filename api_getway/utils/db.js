const mysql = require('mysql');
const { promisify } = require('util');
const config = require('../config');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_BANKING_NAME
});

const pool_query = promisify(pool.query).bind(pool);

module.exports = {
  load: sql => pool_query(sql),
  add: (entity, tableName) => pool_query(`insert into ${tableName} set ?`, entity),
  del: (condition, tableName) => pool_query(`delete from ${tableName} where ?`, condition),
  patch: (entity, condition, tableName) => pool_query(`update ${tableName} set ? where ?`, [entity, condition]),
  plus: (entity) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.beginTransaction( (err) => {
        if (err) throw err
        connection.query('SELECT surplus, b.id FROM banking_account b JOIN user_info u ON b.id = u.id WHERE u.account_num=? FOR UPDATE', entity.to_account,
        (error, results, fields) => {
          if (error) 
            return connection.rollback(function () {
              throw error
            })
          const {surplus, id} = results[0]
          let acc = surplus + entity.amount
          connection.query('UPDATE banking_account SET ? WHERE ?', [{surplus: acc}, {id: id}], (error, results, fields) => {
            if (error) 
              return connection.rollback(function () {
                throw error
              })
            else {
              entity.surplus = surplus
              connection.query(`INSERT INTO transaction_tranfer SET ?`, entity, (error, results, fields) => {
                if (error)
                  return connection.rollback(function() {
                    throw error
                  })
                else {
                  connection.commit(function(err) {
                    if (err)
                      return connection.rollback(function() {
                        throw err
                      })
                    connection.release()
                    resolve(0)
                  })
                }
              })
            }
          })
        })
      })
    })
  }),
  minus: (entity) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.beginTransaction( (err) => {
        if (err) throw err
        connection.query('SELECT surplus, b.id FROM banking_account b JOIN user_info u ON b.id = u.id WHERE u.account_num=? FOR UPDATE', entity.to_account,
        (error, results, fields) => {
          if (error) 
            return connection.rollback(function () {
              throw error
            })
          const {surplus, id} = results[0]
          if (surplus < entity.amount)
            resolve(-1)
          else {
            let acc = surplus - entity.amount
            connection.query('UPDATE banking_account SET ? WHERE ?', [{surplus: acc}, {id: id}], (error, results, fields) => {
              if (error) 
                return connection.rollback(function () {
                  throw error
                })
              else {
                entity.surplus = surplus
                connection.query(`INSERT INTO transaction_tranfer SET ?`, entity, (error, results, fields) => {
                  if (error)
                    return connection.rollback(function() {
                      throw error
                    })
                  else {
                    connection.commit(function(err) {
                      if (err)
                        return connection.rollback(function() {
                          throw err
                        })
                      connection.release()
                      resolve(0)
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  }),
  minusTransfer: (tranId, amount, account) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.beginTransaction( (err) => {
        if (err) throw err
        connection.query('SELECT b.surplus, b.id FROM banking_account b JOIN user_info u ON b.id = u.id WHERE u.account_num=? FOR UPDATE', account,
        (error, results, fields) => {
          if (error) {
            console.log(error)
            return connection.rollback(function () {
              throw error
            })
          }
            
          const {surplus, id} = results[0]
          if (surplus < amount)
            resolve(-1)
          else {
            let acc = surplus - amount
            connection.query('UPDATE banking_account SET ? WHERE ?', [{surplus: acc}, {id: id}], (error, results, fields) => {
              if (error) 
                return connection.rollback(function () {
                  throw error
                })
              else {
                connection.query('UPDATE transaction_tranfer SET state=1 WHERE ?', [{trans_id : tranId}], (error, results, fields) => {
                  if (error)
                    return connection.rollback(function() {
                      throw error
                    })
                  else {
                    connection.commit(function(err) {
                      if (err)
                        return connection.rollback(function() {
                          throw err
                        })
                      connection.release()
                      resolve(0)
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  }),
};
