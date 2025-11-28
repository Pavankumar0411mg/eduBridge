# eduBridge - Rural Education Platform

![GitHub repo size](https://img.shields.io/github/repo-size/Pavankumar0411mg/eduBridge)
![GitHub stars](https://img.shields.io/github/stars/Pavankumar0411mg/eduBridge?style=social)
![GitHub forks](https://img.shields.io/github/forks/Pavankumar0411mg/eduBridge?style=social)

A comprehensive full-stack web application designed to enhance education in rural areas for 11th and 12th standard students across Science, Commerce, and Arts streams.

**🔗 Repository**: [https://github.com/Pavankumar0411mg/eduBridge](https://github.com/Pavankumar0411mg/eduBridge)

## Features

### 🎯 Core Functionality
- **Role-based Access Control**: Admin, Teacher, Student, Parent roles
- **Multi-stream Support**: Science, Commerce, Arts with specific subjects
- **Study Materials Management**: Upload/download PDFs, videos, notes
- **Multi-language Support**: Regional languages + English
- **Responsive Design**: Optimized for rural internet conditions (2G/3G)

### 👥 User Roles & Capabilities

**Admin**
- User management (Teachers, Students, Parents)
- Content management and oversight
- System configuration

**Teacher**
- Upload study materials
- Create and manage quizzes
- View student progress

**Student**
- Access study materials by stream/subject
- Take quizzes and assessments
- View progress reports

**Parent**
- Monitor child's progress
- Receive notifications
- View academic reports

### 📚 Subject Structure

**Science Stream**: Physics, Chemistry, Biology, Mathematics, Computer Science
**Commerce Stream**: Accountancy, Business Studies, Economics, Mathematics, English
**Arts Stream**: History, Political Science, Geography, Sociology, Literature

## Technology Stack

- **Frontend**: React.js with responsive design
- **Backend**: Node.js + Express.js
- **Database**: MySQL
- **Authentication**: JWT-based
- **File Upload**: Multer middleware

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Installation

1. **Clone and Setup**
   ```bash
   cd eduBridge
   ```

2. **Database Setup**
   ```bash
   # Create MySQL database
   mysql -u root -p
   source database/schema.sql
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Configure environment variables in .env
   # Update database credentials if needed
   
   # Create uploads directory
   mkdir uploads
   
   # Start backend server
   npm run dev
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   
   # Start React development server
   npm start
   ```

5. **Access Application**
   - Frontend: https://edubridge-rural-aqjli9r7j-pavan-kumar-m-gs-projects.vercel.app/login
   - Backend API: http://localhost:5000

### Default Admin Login
- **Username**: admin
- **Password**: password

## Project Structure

```
eduBridge/
├── frontend/                 # React.js application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── backend/                 # Node.js API server
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   └── uploads/            # File upload directory
├── database/               # Database schema and scripts
└── assets/                 # Project assets (logos, images)
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Study Materials
- `GET /api/materials` - Get materials (with filters)
- `POST /api/materials/upload` - Upload material (Admin/Teacher)

### Streams & Subjects
- `GET /api/streams` - Get all streams
- `GET /api/streams/:id/subjects` - Get subjects by stream

## Database Schema

### Key Tables
- **Users**: User accounts with role-based access
- **Streams**: Academic streams (Science, Commerce, Arts)
- **Subjects**: Stream-specific subjects
- **StudyMaterials**: Learning resources with metadata
- **Quizzes & Questions**: Assessment system
- **ProgressReports**: Student performance tracking
- **Notifications**: System announcements

## Development Guidelines

### Adding New Features
1. Backend: Create routes in `/backend/routes/`
2. Frontend: Add components in `/frontend/src/components/`
3. Database: Update schema in `/database/schema.sql`

### File Upload
- Supported formats: PDF, MP4, DOC, PPT
- Files stored in `/backend/uploads/`
- Paths saved in database for retrieval

### Role-based Access
- Use `authenticateToken` middleware for protected routes
- Use `authorizeRoles` middleware for role-specific access

## Deployment Considerations

### Production Setup
1. Set environment variables for production
2. Configure MySQL with proper credentials
3. Set up file storage (local or cloud)
4. Enable HTTPS for secure authentication
5. Optimize for low-bandwidth connections

### Performance Optimization
- Implement file compression
- Add caching for frequently accessed content
- Optimize images and videos for rural internet
- Consider offline-first approach for critical features

## Future Enhancements

- [ ] Live video streaming integration
- [ ] Mobile app development
- [ ] Offline content synchronization
- [ ] Advanced analytics dashboard
- [ ] SMS/Email notification system
- [ ] Multi-language content management
- [ ] Career guidance modules
- [ ] Discussion forum implementation

## Support

For technical support or feature requests, please refer to the project documentation or contact the development team.

## License

This project is developed for educational purposes to enhance rural education accessibility.
