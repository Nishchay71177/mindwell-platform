# Contributing to MindWell

Thank you for your interest in contributing to MindWell! This project aims to support student mental wellness through technology, and we welcome contributions that help us achieve this mission.

## 🌟 Code of Conduct

### Our Commitment
- **Safety First**: Mental health is sensitive. All contributions should prioritize user safety and well-being
- **Inclusive**: We welcome contributors from all backgrounds and experience levels
- **Respectful**: Treat all community members with respect and kindness
- **Evidence-Based**: Mental health features should be based on research and best practices

### Unacceptable Behavior
- Harassment, discrimination, or offensive comments
- Sharing personal mental health information without consent
- Promoting harmful mental health advice or practices
- Spam or irrelevant contributions

## 🚀 Getting Started

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/mindwell-platform.git`
3. Install dependencies: `npm install`
4. Copy `.env.example` to `.env.local` and add your API keys
5. Run development server: `npm run dev`

### Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Application pages/routes
├── contexts/      # React contexts (auth, etc.)
├── lib/          # Utilities and services
└── styles/       # Global styles
```

## 🎯 Contribution Types

### Bug Fixes
- Fix broken functionality
- Improve error handling
- Enhance accessibility
- Performance optimizations

### Features
- New wellness tools or exercises
- UI/UX improvements
- Analytics and insights
- Integration with mental health resources

### Documentation
- API documentation
- User guides
- Developer documentation
- Mental health resource updates

### Testing
- Unit tests
- Integration tests
- User experience testing
- Accessibility testing

## 📝 Contribution Process

### 1. Choose an Issue
- Check [existing issues](https://github.com/YOUR_USERNAME/mindwell-platform/issues)
- Look for issues labeled `good-first-issue` for beginners
- Comment on issues you'd like to work on

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Changes
- Follow existing code style and patterns
- Add tests for new functionality
- Update documentation as needed
- Test your changes thoroughly

### 4. Commit Guidelines
Use conventional commit messages:
```bash
feat: add mood trend analysis
fix: resolve authentication redirect issue
docs: update API documentation
style: improve button hover states
test: add mood tracking tests
```

### 5. Submit Pull Request
- Create a clear PR title and description
- Reference related issues with `Closes #123`
- Include screenshots for UI changes
- Request review from maintainers

## 🧪 Testing Guidelines

### Before Submitting
- [ ] All tests pass: `npm run test`
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] Responsive design works on mobile/desktop
- [ ] Accessibility guidelines followed

### Mental Health Features
- [ ] Error states don't cause user distress
- [ ] Loading states are clear and reassuring
- [ ] Data is handled securely and privately
- [ ] Crisis resources are easily accessible

## 📋 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use semantic HTML
- Implement proper error boundaries
- Handle loading and error states

### UI/UX Guidelines
- Follow the calming design theme (greens, blues)
- Ensure accessibility (WCAG 2.1 AA)
- Use clear, supportive language
- Provide helpful error messages
- Consider users in crisis situations

### Mental Health Considerations
- **Privacy**: User data should be encrypted and secure
- **Crisis Handling**: Always provide emergency resources
- **Inclusive Language**: Use person-first, non-stigmatizing language
- **Evidence-Based**: Base features on mental health research
- **Gentle UX**: Avoid harsh colors, aggressive language, or pressure

## 🔒 Security & Privacy

### Sensitive Data
- Never log personal information
- Encrypt data in transit and at rest
- Follow HIPAA guidelines where applicable
- Implement proper authentication

### API Keys
- Never commit API keys to the repository
- Use environment variables
- Rotate keys regularly
- Monitor for unauthorized usage

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `good-first-issue` - Good for newcomers
- `mental-health` - Related to mental health features
- `accessibility` - Accessibility improvements
- `security` - Security-related issues
- `documentation` - Documentation updates

## 🤝 Getting Help

### Questions?
- Create a discussion in the [Discussions](https://github.com/YOUR_USERNAME/mindwell-platform/discussions) tab
- Join our community chat (if available)
- Email the maintainers

### Mental Health Resources
If you're working on mental health features and need guidance:
- [SAMHSA Guidelines](https://www.samhsa.gov/)
- [Crisis Text Line Best Practices](https://www.crisistextline.org/)
- [Mental Health First Aid](https://www.mentalhealthfirstaid.org/)

## 🎉 Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- Annual contributor highlights

## 📞 Emergency Notice

**If you're experiencing a mental health crisis while contributing:**
- **US**: Call 988 (Suicide & Crisis Lifeline)
- **Text**: Text HOME to 741741 (Crisis Text Line)
- **International**: Visit [findahelpline.com](https://findahelpline.com)

Your well-being is more important than any code contribution.

---

Thank you for helping make mental wellness more accessible to students everywhere! 💚