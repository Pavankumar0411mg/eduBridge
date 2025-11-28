# Contributing to eduBridge

## Development Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/Pavankumar0411mg/eduBridge.git
   cd eduBridge
   ```

2. **Install Dependencies**
   ```bash
   npm run install-all
   ```

3. **Database Setup**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

4. **Environment Configuration**
   - Copy `backend/.env.example` to `backend/.env`
   - Update database credentials

5. **Start Development**
   ```bash
   npm run dev
   ```

## Project Structure
- `backend/` - Node.js API server
- `frontend/` - React.js application  
- `database/` - MySQL schema and sample data
- `assets/` - Project assets and images

## Pull Request Process
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request with description