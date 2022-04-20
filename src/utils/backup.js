import keys from "../keys";
import mysqldump from 'mysqldump';
const moment = require('moment');
const fs = require('fs');

const backupDB = async (name, path) => {
    try {
        const fileName = `${name}_${moment().format('YYYY_MM_DD')}.sql`
        const wstream = fs.createWriteStream(`${path}/${fileName}`)

        await mysqldump({
            connection: {
                host: keys.database["host"],
                user: keys.database["user"],
                password: keys.database["password"],
                database: keys.database["database"],
            },
                dumpToFile: wstream.path,
        });
        return {mensaje: "Respaldo de la base de datos creado.", codigo: 1};
    } catch (error) {
        return error
    }
}

exports.backupDB = backupDB;