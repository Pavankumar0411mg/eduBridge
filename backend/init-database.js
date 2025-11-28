const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
    try {
        // Database connection
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'railway',
            port: process.env.DB_PORT || 3306
        });

        console.log('Connected to database');

        // Read and execute SQL file
        const sqlFile = path.join(__dirname, '..', 'railway-database-setup.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');
        
        // Split SQL into individual statements
        const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);
        
        for (const statement of statements) {
            if (statement.trim()) {
                await connection.execute(statement);
                console.log('Executed SQL statement');
            }
        }

        console.log('Database initialized successfully!');
        
        // Test login
        const [rows] = await connection.execute(
            'SELECT * FROM Users WHERE username = ? AND role = ?',
            ['admin', 'Admin']
        );
        
        console.log('Admin user found:', rows.length > 0 ? 'Yes' : 'No');
        
        await connection.end();
        
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    initializeDatabase();
}

module.exports = initializeDatabase;