var pool = require('./bd');// llamando a mi BD
var md5 = require('md5');

async function getUserByUsernameAndPassword(user, password) {//puedo cambiar mi nombre en el get
    try {
        var query = 'select * from usuarios where usuario = ? and password = ? limit 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getUserByUsernameAndPassword}