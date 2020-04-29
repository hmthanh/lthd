const db = require('./utils/db')


let updateDB = async () => {

  let user = await db.load(`SELECT id FROM user_info`)
  user.forEach(async element => {
    let rows = await db.load(`SELECT COUNT(id) as count FROM banking_account WHERE owner_id=${element.id}`)
    // console.log(rows[0].count)
    if (rows[0].count === 0) {
      let entity = {
        owner_id: element.id,
        surplus: 0,
        type: 1
      }
      console.log(`update entity ${entity}`)
      await db.add({...entity}, 'banking_account')
      console.log(`update entity ${{...entity, type: 2}}`)
      await db.add({...entity, type: 2}, 'banking_account')
    }
  });
}
updateDB()

