# MindWell - Mental Wellness Platform

A student-focused mental health and wellness platform built with React, TypeScript, and Supabase. MindWell provides AI-powered wellness coaching, mood tracking, resources, and gamified wellness points to support students' mental health journey.

## ✨ Features

- **🤖 AI Wellness Coach**: Chat with a supportive AI powered by Gemini AI for personalized mental health guidance
- **🌤️ Mood Tracking**: Log daily moods with emojis and notes, visualize trends with interactive charts
- **📚 Wellness Hub**: Access articles, guided meditations, breathing exercises, and emergency resources
- **🎮 Gamified Points System**: Earn wellness points for activities like mood logging and chat sessions
- **👤 User Profiles**: Manage account settings and track wellness journey progress
- **📱 Responsive Design**: Optimized for both desktop and mobile devices

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (Authentication, Database, Real-time)
- **AI**: Google Gemini API
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google AI Studio account (for Gemini API)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mindwell-app
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 3. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL editor in your Supabase dashboard
3. Run the SQL commands from `supabase-schema.sql` to create the database tables and policies
4. Enable email authentication in Authentication > Settings

### 4. Get API Keys

#### Supabase Keys
- Go to Settings > API in your Supabase project
- Copy the Project URL and anon/public key

#### Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your environment file

### 5. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Layout.tsx       # Main layout with navigation
│   └── ProtectedRoute.tsx
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state
├── lib/                 # Utility libraries
│   ├── supabase.ts      # Supabase client & types
│   ├── gemini.ts        # Gemini AI service
│   └── utils.ts         # General utilities
├── pages/               # Application pages
│   ├── Login.tsx        # Authentication pages
│   ├── SignUp.tsx
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Mood.tsx         # Mood tracking
│   ├── Chat.tsx         # AI chatbot
│   ├── Resources.tsx    # Wellness resources
│   └── Profile.tsx      # User profile
└── App.tsx              # Main app component
```

## 📊 Database Schema

The application uses the following main tables:

- **profiles**: User profile information
- **mood_entries**: Daily mood logs with ratings and notes
- **chat_conversations**: AI chat conversation threads
- **chat_messages**: Individual chat messages
- **wellness_points**: Gamification point tracking

See `supabase-schema.sql` for the complete database setup.

## 🎨 UI Components

Built with [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible components:

- Buttons, Cards, Inputs, Textareas
- Navigation and Layout components
- Charts and data visualizations
- Responsive design system

## 🔐 Authentication & Security

- Supabase Auth with email/password
- Row-level security policies
- Protected routes with authentication guards
- Secure API key management

## 🤖 AI Integration

The AI wellness coach uses Google's Gemini Pro model with:

- Contextual conversation history
- Mental health-focused system prompts
- Supportive, empathetic responses
- Crisis intervention awareness

## 📱 Features in Detail

### Mood Tracking
- 5-point scale with emoji indicators
- Optional daily notes
- Interactive 7-day trend visualization
- Daily tracking limits to encourage consistency

### AI Wellness Coach
- Persistent conversation history
- Context-aware responses
- Automatic conversation titling
- Points awarded for engagement

### Wellness Hub
- Curated mental health articles
- Guided meditation resources
- Breathing exercise instructions
- Emergency crisis resources

### Gamification
- Points for mood logging (10 points)
- Points for AI chat sessions (5 points)
- Level progression system
- Achievement tracking (coming soon)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel settings
4. Deploy automatically

### Other Platforms

The app is a standard Vite React application and can be deployed to:
- Netlify
- Railway
- Heroku
- Any static hosting provider

Build command: `npm run build`
Output directory: `dist`

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Adding New Features

1. Follow the existing folder structure
2. Use TypeScript for type safety
3. Implement proper error handling
4. Add appropriate Supabase RLS policies
5. Test across different screen sizes

## 📈 Future Enhancements

- [ ] Push notifications for mood tracking reminders
- [ ] Social features (anonymous peer support)
- [ ] Integration with wearable devices
- [ ] Advanced analytics and insights
- [ ] Therapist directory integration
- [ ] Group challenges and competitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you need help or have questions:

1. Check the [Issues](https://github.com/your-username/mindwell-app/issues) page
2. Create a new issue with detailed information
3. For urgent mental health support, please contact:
   - National Suicide Prevention Lifeline: 988
   - Crisis Text Line: Text HOME to 741741

## ⚠️ Important Notes

- This application is for educational purposes and should not replace professional mental health care
- Always encourage users experiencing crisis to seek immediate professional help
- Ensure compliance with healthcare privacy regulations in your jurisdiction
- Regularly update dependencies for security

---

Built with ❤️ for student mental wellness