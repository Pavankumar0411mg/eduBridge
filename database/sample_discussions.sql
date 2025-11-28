USE eduBridgeDB;

-- Create tables first
CREATE TABLE IF NOT EXISTS Discussions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INT NOT NULL,
    status ENUM('Open', 'Answered', 'Closed') DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS DiscussionReplies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discussion_id INT NOT NULL,
    author_id INT NOT NULL,
    content TEXT NOT NULL,
    is_admin_reply BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (discussion_id) REFERENCES Discussions(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Insert sample discussions
INSERT INTO Discussions (title, content, author_id, status) VALUES
('Physics Doubt - Motion in a Straight Line', 'I am having trouble understanding the concept of acceleration. Can someone explain with examples?', 2, 'Open'),
('Chemistry Lab Equipment', 'What safety precautions should we take while handling acids in the chemistry lab?', 3, 'Open'),
('Mathematics - Calculus Help', 'Can someone help me understand derivatives and their applications?', 4, 'Open');

-- Insert sample replies
INSERT INTO DiscussionReplies (discussion_id, author_id, content, is_admin_reply) VALUES
(1, 1, 'Acceleration is the rate of change of velocity. For example, when a car speeds up from 0 to 60 km/h, it accelerates.', TRUE),
(2, 1, 'Always wear safety goggles, use fume hood, and have neutralizing agents ready when working with acids.', TRUE);