🚀 FullStack Experimental Social App like Twitter

A modern full-stack social app clone built with Next.js, React, TailwindCSS, Prisma, and MongoDB.
This project demonstrates real-world features like authentication, social interactions, and scalable backend architecture.

📸 Preview

🛠️ Tech Stack
Frontend: Next.js, React, TailwindCSS
Backend: Next.js API Routes
Database: MongoDB + Prisma ORM
Authentication: NextAuth (Credentials-based)
Security: bcrypt password hashing
✨ Features
🔐 Authentication system (Login / Register)
🧑 User profiles
📝 Create, delete posts
❤️ Like / Unlike posts
💬 Comment / Reply system
🔔 Notifications
👥 Follow / Unfollow users
📱 Fully responsive UI
🖼️ Image upload (Base64)
⚙️ Prerequisites

⚠️ Updated requirements (important)

Node.js ≥ 20.19
npm or yarn
MongoDB database (local or Atlas)
📦 Installation

1. Clone the repository
   git clone https://github.com/Sahilaggarwal3/An-Experimental-Social-App.git
2. Install dependencies
   npm install
3. Setup environment variables

Create a .env file in the root:

DATABASE_URL="your_mongodb_connection_string"

NEXTAUTH_SECRET="your_generated_secret"

👉 Generate secret:

openssl rand -base64 32 4. Generate Prisma Client
npx prisma generate 5. Push database schema
npx prisma db push 6. Run the project
npm run dev
🔐 Authentication Setup (Important)

This project uses NextAuth with JWT strategy.

Make sure your config includes:

callbacks: {
async jwt({ token, user }) {
if (user) {
token.id = user.id;
token.email = user.email;
}
return token;
},
async session({ session, token }) {
if (session.user) {
session.user.id = token.id;
session.user.email = token.email;
}
return session;
}
}
🧠 Key Learning Outcomes
Implemented secure authentication with JWT
Designed relational data using Prisma
Built scalable API routes with Next.js
Managed global state and UI responsiveness
Debugged real-world issues (Prisma, NextAuth, sessions)
🚀 Deployment

You can deploy easily on:

Vercel (recommended)
Render / Railway
📂 Project Structure
/pages
/api
/auth
[...nextauth].ts
/libs
prismadb.ts
/components
/hooks
⚠️ Common Issues & Fixes
Prisma not initializing
npx prisma generate
Node version error
nvm install --lts
Not signed in (NextAuth)
Ensure callbacks are added
Check session includes email

🙌 Credits

Original tutorial by:
👉 https://www.youtube.com/watch?v=ytkG7RT6SvU

📌 Author

Sahil Bansal

Full Stack Developer
Aspiring AI Engineer
