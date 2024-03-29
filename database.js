
"use strict";

const Database = require('better-sqlite3');

const db = new Database('log.db');


const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`);



let row = stmt.get();

if(row === undefined) {
    console.log('Log database missing');

    const sqlInit = `
    CREATE TABLE accesslog ( 
        id INTEGER PRIMARY KEY, 
        remoteaddr TEXT,
        remoteuser TEXT,
        time TEXT,
        method TEXT,
        url TEXT,
        protocol TEXT,
        httpversion TEXT,
        status TEXT, 
        referrer TEXT,
        useragent TEXT
    );
    `;
    db.exec(sqlInit)
} else {
    console.log('Database exists.')
}

module.exports = db