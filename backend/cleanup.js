const mysql = require('mysql2/promise');

async function cleanup() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'edubridgedb'
    });

    await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
    await connection.execute('DELETE FROM Users WHERE role IN ("Student", "Teacher", "Parent")');
    await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
    
    console.log('All students, teachers, and parents deleted');
    await connection.end();
}

cleanup().catch(console.error);