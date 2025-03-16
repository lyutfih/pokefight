# Pokefight

A Pokemon-themed battle game where players face off against computer-controlled Pokemon using a strategic battle algorithm.

## Project Structure

- `client/` - React frontend with Tailwind CSS
- `server/` - Express backend with MongoDB and OOP architecture

## Local Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB database (local or Atlas)

### Setup

1. Clone the repository:

   ```
   git clone <repository-url>
   cd pokefight
   ```

2. Install dependencies for both client and server:

   ```
   npm run install:all
   ```

3. Create a `.env` file in the server directory:

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start both the client and server in development mode:

   ```
   npm run dev
   ```

   Or run them separately:

   ```
   npm run dev:client
   npm run dev:server
   ```

5. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api

## Deployment to Vercel

This project is set up as a monorepo for deployment to Vercel. Follow these steps for a successful deployment:

1. Push your code to GitHub:

   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. Connect your GitHub repository to Vercel:
   - Go to [Vercel](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project with these settings:
     - Framework Preset: Other
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `dist`
3. Add environment variables in Vercel:

   - `MONGODB_URI`: Your MongoDB Atlas connection string

   That's it! The project is now configured to work with Vercel's serverless functions.

4. Deploy the project by clicking "Deploy"

5. If you encounter issues after deployment:
   - Make sure your MongoDB Atlas connection string is correct and the IP is whitelisted (add 0.0.0.0/0 to allow all IPs during testing)
   - Check that your build process completed successfully in the Vercel logs
   - Verify that the static files are being correctly generated in the dist directory

## Game Features

- Browse and select from a variety of Pokemon
- Battle against computer-controlled Pokemon with strategic gameplay
- Use different attack types: regular attack, special attack, and heal
- Save your scores to the leaderboard when your battle run ends
- View top trainers on the global leaderboard

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS, Axios, Vite
- **Backend**: Node.js, Express, MongoDB with Mongoose
- **Architecture**: Object-Oriented Programming (OOP)
- **Deployment**: Vercel (monorepo configuration with serverless functions)

## Game Mechanics

- Each Pokemon has unique stats that affect battle performance
- Regular attacks deal damage based on Attack and Defense stats
- Special attacks deal more damage but require charging (2 regular moves)
- Healing restores a percentage of your Pokemon's max HP
- The computer opponent uses a strategic algorithm to decide its moves
- Your score increases with each opponent you defeat
