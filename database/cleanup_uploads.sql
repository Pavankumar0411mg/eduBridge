-- Clean up uploaded files directory
-- This script provides the file paths that need to be deleted from the uploads folder

USE eduBridgeDB;

-- Show files that will be orphaned after user deletion
SELECT 'Files to be deleted from uploads folder:' as Status;
SELECT file_path FROM StudyMaterials 
WHERE uploaded_by IN (
    SELECT id FROM Users WHERE role IN ('Teacher', 'Student')
);

-- Note: The actual file deletion from the filesystem needs to be done manually
-- or through a backend script since SQL cannot directly delete files from disk