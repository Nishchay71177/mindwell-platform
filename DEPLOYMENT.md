# MindWell Deployment Guide

## GitHub Repository Setup

After creating your GitHub repository, run these commands:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/mindwell-platform.git
git branch -M main
git push -u origin main
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your `mindwell-platform` repository

2. **Configure Environment Variables:**
   Add these in Vercel dashboard under Settings → Environment Variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key  
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Deploy:**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Vercel will auto-deploy on every push to main branch

### Option 2: Netlify

1. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "New site from Git"
   - Select your repository

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables:**
   Add in Site Settings → Environment Variables

### Option 3: Railway

1. **Connect to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub"

## Required Setup Before Deployment

### 1. Supabase Setup

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor and run commands from `supabase-schema.sql`
4. Go to Settings → API to get:
   - Project URL
   - Anon/public key

### 2. Gemini API Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create new API key
3. Copy the key for environment variables

### 3. Update Environment Variables

Replace the placeholder values in your deployment platform with real values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_GEMINI_API_KEY=AIzaSyC...
```

## Testing the Deployment

After deployment:

1. Visit your deployed URL
2. Create a test account
3. Test the features:
   - Sign up/Login
   - Mood tracking
   - AI Chat (requires valid Gemini API key)
   - Navigation between pages

## Domain Setup (Optional)

### Vercel:
- Go to Project Settings → Domains
- Add your custom domain

### Netlify:
- Go to Site Settings → Domain management
- Add custom domain

## Monitoring & Analytics

Consider adding:
- Vercel Analytics
- Google Analytics
- Sentry for error tracking
- Supabase Analytics for database insights

## Security Notes

- Never commit API keys to the repository
- Use environment variables for all sensitive data
- Enable RLS policies in Supabase (already configured)
- Consider adding rate limiting for production

## Post-Deployment Checklist

- [ ] All environment variables set correctly
- [ ] Supabase tables created and RLS enabled
- [ ] Authentication working (sign up/login)
- [ ] Mood tracking functional
- [ ] AI chat working (with valid API key)
- [ ] Responsive design verified
- [ ] Error handling tested
- [ ] Database connections secure