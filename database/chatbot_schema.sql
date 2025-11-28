-- Chatbot conversation history table (optional for future enhancements)
USE edubridgedb;

-- Create chatbot conversations table
CREATE TABLE IF NOT EXISTS ChatConversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_id VARCHAR(255),
    message_type ENUM('question', 'explanation', 'navigation', 'general') DEFAULT 'general',
    subject VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    INDEX idx_user_timestamp (user_id, timestamp),
    INDEX idx_session (session_id)
);

-- Create chatbot feedback table (for improving responses)
CREATE TABLE IF NOT EXISTS ChatFeedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT NOT NULL,
    user_id INT NOT NULL,
    rating TINYINT CHECK (rating BETWEEN 1 AND 5),
    feedback_text TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES ChatConversations(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create chatbot analytics table (for usage tracking)
CREATE TABLE IF NOT EXISTS ChatAnalytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    total_conversations INT DEFAULT 0,
    total_messages INT DEFAULT 0,
    unique_users INT DEFAULT 0,
    avg_session_length DECIMAL(5,2) DEFAULT 0,
    popular_topics JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_date (date)
);

-- Insert initial analytics record
INSERT IGNORE INTO ChatAnalytics (date, total_conversations, total_messages, unique_users) 
VALUES (CURDATE(), 0, 0, 0);

-- Create view for recent conversations
CREATE OR REPLACE VIEW RecentChatActivity AS
SELECT 
    cc.id,
    u.username,
    u.role,
    cc.message,
    cc.response,
    cc.timestamp,
    cc.subject,
    cc.message_type
FROM ChatConversations cc
JOIN Users u ON cc.user_id = u.id
WHERE cc.timestamp >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY cc.timestamp DESC;

-- Create procedure to clean old conversations (keep last 30 days)
DELIMITER //
CREATE PROCEDURE CleanOldChatHistory()
BEGIN
    DELETE FROM ChatConversations 
    WHERE timestamp < DATE_SUB(NOW(), INTERVAL 30 DAY);
    
    DELETE FROM ChatFeedback 
    WHERE timestamp < DATE_SUB(NOW(), INTERVAL 30 DAY);
END //
DELIMITER ;

-- Create event to run cleanup weekly (optional)
-- SET GLOBAL event_scheduler = ON;
-- CREATE EVENT IF NOT EXISTS weekly_chat_cleanup
-- ON SCHEDULE EVERY 1 WEEK
-- DO CALL CleanOldChatHistory();

COMMIT;