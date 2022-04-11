import keys from "../keys";
import mysqldump from 'mysqldump';
const moment = require('moment');
const fs = require('fs');

const backupDB = async (name, path) => {
    const fileName = `${name}_${moment().format('YYYY_MM_DD')}.sql`
    const wstream = fs.createWriteStream(`${path}/${fileName}`)
    console.log(wstream.path);

   return await mysqldump({
        connection: {
            host: keys.database["host"],
            user: keys.database["user"],
            password: keys.database["password"],
            database: keys.database["database"],
        },
            dumpToFile: wstream.path,
        });
}

exports.backupDB = backupDB;