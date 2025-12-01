-- Fix missing student assignments
USE edubridgedb;

-- Ensure all Grade 11 Arts students are properly assigned
UPDATE Users SET grade = 11, stream_id = 3 WHERE username IN ('student61', 'student64', 'student65', 'student66', 'student67', 'student68', 'student69', 'student70', 'student71', 'student72', 'student73', 'student74', 'student75');

-- Ensure all Grade 12 Arts students are properly assigned  
UPDATE Users SET grade = 12, stream_id = 3 WHERE username IN ('student76', 'student77', 'student78', 'student79', 'student80', 'student81', 'student82', 'student83', 'student84', 'student85', 'student86', 'student87', 'student88', 'student89', 'student90');