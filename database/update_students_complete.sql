-- Complete student data update based on current database
USE edubridgedb;

-- Update existing students with correct stream assignments
-- Science Stream Students (Grade 11)
UPDATE Users SET full_name = 'New Student', email = 'newstudent123@gmail.com', grade = 11, stream_id = 1 WHERE username = 'newstudent123';
UPDATE Users SET full_name = 'Aanya Sharma', email = 'aanya.sharma@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student1';
UPDATE Users SET full_name = 'Aarav Kapoor', email = 'aarav.kapoor@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student2';
UPDATE Users SET full_name = 'Aditi Singh', email = 'aditi.singh@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student3';
UPDATE Users SET full_name = 'Ahan Patel', email = 'ahan.patel@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student4';
UPDATE Users SET full_name = 'Akshara Nair', email = 'akshara.nair@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student5';
UPDATE Users SET full_name = 'Amit Kumar', email = 'amit.kumar@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student6';
UPDATE Users SET full_name = 'Ananya Verma', email = 'ananya.verma@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student7';
UPDATE Users SET full_name = 'Anika Gupta', email = 'anika.gupta@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student8';
UPDATE Users SET full_name = 'Arnav Reddy', email = 'arnav.reddy@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student9';
UPDATE Users SET full_name = 'Ayush Dubey', email = 'ayush.dubey@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student10';
UPDATE Users SET full_name = 'Bhavna Rao', email = 'bhavna.rao@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student11';
UPDATE Users SET full_name = 'Devansh Joshi', email = 'devansh.joshi@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student12';
UPDATE Users SET full_name = 'Diya Mehta', email = 'diya.mehta@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student13';
UPDATE Users SET full_name = 'Ekansh Tiwari', email = 'ekansh.tiwari@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student14';
UPDATE Users SET full_name = 'Falguni Sharma', email = 'falguni.sharma@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student15';

-- Science Stream Students (Grade 12)
UPDATE Users SET full_name = 'Gaurav Singh', email = 'gaurav.singh@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student16';
UPDATE Users SET full_name = 'Harsha Desai', email = 'harsha.desai@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student17';
UPDATE Users SET full_name = 'Ishaan Malhotra', email = 'ishaan.malhotra@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student18';
UPDATE Users SET full_name = 'Jhanvi Shah', email = 'jhanvi.shah@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student19';
UPDATE Users SET full_name = 'Kaira Jain', email = 'kaira.jain@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student20';
UPDATE Users SET full_name = 'Kavya Kumar', email = 'kavya.kumar@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student21';
UPDATE Users SET full_name = 'Kiara Singh', email = 'kiara.singh@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student22';
UPDATE Users SET full_name = 'Lakshya Verma', email = 'lakshya.verma@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student23';
UPDATE Users SET full_name = 'Madhav Reddy', email = 'madhav.reddy@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student24';
UPDATE Users SET full_name = 'Maya Patel', email = 'maya.patel@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student25';
UPDATE Users SET full_name = 'Mohit Gupta', email = 'mohit.gupta@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student26';
UPDATE Users SET full_name = 'Naina Sharma', email = 'naina.sharma@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student27';
UPDATE Users SET full_name = 'Nakul Singh', email = 'nakul.singh@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student28';
UPDATE Users SET full_name = 'Navya Kapoor', email = 'navya.kapoor@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student29';
UPDATE Users SET full_name = 'Nidhi Verma', email = 'nidhi.verma@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student30';
UPDATE Users SET full_name = 'pk', email = 'student@gmail.com', grade = 12, stream_id = 1 WHERE username = 'student63';

-- Commerce Stream Students (Grade 11)
UPDATE Users SET full_name = 'Nishant Sharma', email = 'nishant.sharma@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student31';
UPDATE Users SET full_name = 'Om Desai', email = 'om.desai@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student32';
UPDATE Users SET full_name = 'Ojas Jain', email = 'ojas.jain@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student33';
UPDATE Users SET full_name = 'Pari Shah', email = 'pari.shah@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student34';
UPDATE Users SET full_name = 'Parth Malhotra', email = 'parth.malhotra@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student35';
UPDATE Users SET full_name = 'Prisha Sharma', email = 'prisha.sharma@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student36';
UPDATE Users SET full_name = 'Raghav Singh', email = 'raghav.singh@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student37';
UPDATE Users SET full_name = 'Riya Patel', email = 'riya.patel@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student38';
UPDATE Users SET full_name = 'Rohan Kumar', email = 'rohan.kumar@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student39';
UPDATE Users SET full_name = 'Rujul Gupta', email = 'rujul.gupta@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student40';
UPDATE Users SET full_name = 'Saanvi Singh', email = 'saanvi.singh@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student41';
UPDATE Users SET full_name = 'Sakshi Verma', email = 'sakshi.verma@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student42';
UPDATE Users SET full_name = 'Samarth Sharma', email = 'samarth.sharma@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student43';
UPDATE Users SET full_name = 'Samaira Patel', email = 'samaira.patel@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student44';
UPDATE Users SET full_name = 'Samiksha Kapoor', email = 'samiksha.kapoor@gmail.com', grade = 11, stream_id = 2 WHERE username = 'student45';

-- Commerce Stream Students (Grade 12)
UPDATE Users SET full_name = 'Sanjay Verma', email = 'sanjay.verma@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student46';
UPDATE Users SET full_name = 'Sarah Khan', email = 'sarah.khan@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student47';
UPDATE Users SET full_name = 'Shaan Reddy', email = 'shaan.reddy@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student48';
UPDATE Users SET full_name = 'Shreya Singh', email = 'shreya.singh@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student49';
UPDATE Users SET full_name = 'Siddharth Sharma', email = 'siddharth.sharma@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student50';
UPDATE Users SET full_name = 'Siya Patel', email = 'siya.patel@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student51';
UPDATE Users SET full_name = 'Soniya Kumar', email = 'soniya.kumar@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student52';
UPDATE Users SET full_name = 'Suhana Khan', email = 'suhana.khan@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student53';
UPDATE Users SET full_name = 'Tanay Sharma', email = 'tanay.sharma@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student54';
UPDATE Users SET full_name = 'Tanvi Singh', email = 'tanvi.singh@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student55';
UPDATE Users SET full_name = 'Vedant Patel', email = 'vedant.patel@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student56';
UPDATE Users SET full_name = 'Vihan Gupta', email = 'vihan.gupta@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student57';
UPDATE Users SET full_name = 'Vivaan Sharma', email = 'vivaan.sharma@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student58';
UPDATE Users SET full_name = 'Yuvraj Singh', email = 'yuvraj.singh@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student59';
UPDATE Users SET full_name = 'Zara Kapoor', email = 'zara.kapoor@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student60';
UPDATE Users SET full_name = 'pavan kumar', email = 'mgpavankumar61@gmail.com', grade = 12, stream_id = 2 WHERE username = 'student62';

-- Arts Stream Students (Grade 11)
UPDATE Users SET full_name = 'Arjun Sharma', email = 'arjun.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student61';
UPDATE Users SET full_name = 'manish', email = 'manish@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student64';
UPDATE Users SET full_name = 'Rahul Kumar', email = 'rahul.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student65';
UPDATE Users SET full_name = 'Sneha Verma', email = 'sneha.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student66';
UPDATE Users SET full_name = 'Varun Reddy', email = 'varun.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student67';
UPDATE Users SET full_name = 'Priya Jain', email = 'priya.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student68';
UPDATE Users SET full_name = 'Aditya Malhotra', email = 'aditya.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student69';
UPDATE Users SET full_name = 'Kavya Desai', email = 'kavya.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student70';
UPDATE Users SET full_name = 'Rohit Shah', email = 'rohit.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student71';
UPDATE Users SET full_name = 'Anjali Kapoor', email = 'anjali.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student72';
UPDATE Users SET full_name = 'Vikash Agarwal', email = 'vikash.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student73';
UPDATE Users SET full_name = 'Pooja Mehta', email = 'pooja.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student74';
UPDATE Users SET full_name = 'Deepak Tiwari', email = 'deepak.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student75';

-- Arts Stream Students (Grade 12)
UPDATE Users SET full_name = 'Neha Sharma', email = 'neha.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student76';
UPDATE Users SET full_name = 'Suresh Patel', email = 'suresh.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student77';
UPDATE Users SET full_name = 'Ritu Singh', email = 'ritu.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student78';
UPDATE Users SET full_name = 'Manish Gupta', email = 'manish.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student79';
UPDATE Users SET full_name = 'Sunita Kumar', email = 'sunita.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student80';
UPDATE Users SET full_name = 'Rajesh Verma', email = 'rajesh.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student81';
UPDATE Users SET full_name = 'Geeta Reddy', email = 'geeta.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student82';
UPDATE Users SET full_name = 'Amit Jain', email = 'amit.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student83';
UPDATE Users SET full_name = 'Sonia Malhotra', email = 'sonia.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student84';
UPDATE Users SET full_name = 'Vinod Desai', email = 'vinod.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student85';
UPDATE Users SET full_name = 'Rekha Shah', email = 'rekha.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student86';
UPDATE Users SET full_name = 'Manoj Kapoor', email = 'manoj.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student87';
UPDATE Users SET full_name = 'Usha Agarwal', email = 'usha.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student88';
UPDATE Users SET full_name = 'Prakash Mehta', email = 'prakash.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student89';
UPDATE Users SET full_name = 'Seema Tiwari', email = 'seema.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student90';