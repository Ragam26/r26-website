# Ragam 26 Website

Official website for Ragam 26

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Runtime**: Node.js 22
- **Package Manager**: npm
- **Styling**: Tailwind CSS, CSS Modules
- **Deployment**: Vercel

## Prerequisites

Before you begin, ensure you have:
- Node.js 22.x installed
- npm (comes with Node.js)
- Git configured with your GitHub account

## Getting Started

### Initial Setup

1. Clone the repository:
```bash
git clone https://github.com/Ragam26/r26-website.git
cd ragam-26-website
```

2. Install dependencies:
```bash
npm install
```

3. Create your development branch (see Branch Conventions below)

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Git Workflow & Branch Conventions

### Branch Structure

```
main (production-ready code)
  └── stage (staging environment)
       └── dev/[your-github-username] (your development branch)
```

### Branch Naming Convention

**IMPORTANT**: All developers must work on their personal branches only.

Format: `dev/[your-github-username]`

Examples:
- `dev/arunnats`
- `dev/rajanisback`

### Creating Your Branch

```bash
# Make sure you're on stage branch
git checkout stage
git pull origin stage

# Create your personal development branch
git checkout -b dev/[your-github-username]

# Example:
git checkout -b dev/johnsmith
```

### Daily Workflow

1. **Start your day**: Pull latest changes from stage
```bash
git checkout stage
git pull origin stage
git checkout dev/[your-github-username]
git merge stage
```

2. **Work on your branch**: Make commits regularly
```bash
git add .
git commit -m "feat: add event registration form"
git push origin dev/[your-github-username]
```

3. **Submit your work**: Create a Pull Request to `stage`

### Commit Message Convention

Follow conventional commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, semicolons, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add event schedule page
fix: resolve mobile menu navigation bug
docs: update API documentation
style: format homepage components
refactor: optimize image loading
```

## Pull Request Process

### Before Creating a PR

1. Ensure your branch is up to date with `stage`
2. Test your changes locally
3. Check for console errors
4. Verify responsive design (mobile, tablet, desktop)

### Creating a PR

1. Go to GitHub repository
2. Click "Pull Requests" → "New Pull Request"
3. Set **base branch** to `stage`
4. Set **compare branch** to `dev/[your-github-username]`
5. Fill in the PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Code refactoring

## Testing Done
- [ ] Tested locally
- [ ] Checked responsive design
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots of UI changes

## Additional Notes
Any additional context or concerns
```

6. Request review from at least one team member
7. Wait for approval before merging

### PR Review Guidelines

- All PRs require at least **1 approval** before merging
- Address all review comments
- Resolve merge conflicts if any
- Delete your branch after successful merge (optional)

## Project File Structure

```
ragam-26-website/
├── public/                    # Static assets
│   ├── images/
│   │   ├── events/
│   │   ├── team/
│   │   └── sponsors/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (routes)/          # Route groups
│   │   │   ├── events/
│   │   │   ├── schedule/
│   │   │   ├── team/
│   │   │   └── register/
│   │   ├── api/               # API routes
│   │   ├── layout.js          # Root layout
│   │   ├── page.js            # Home page
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # Reusable components
│   │   ├── common/            # Shared components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Button/
│   │   │   └── Card/
│   │   ├── sections/          # Page sections
│   │   │   ├── Hero/
│   │   │   ├── EventList/
│   │   │   └── Schedule/
│   │   └── forms/             # Form components
│   │
│   ├── lib/                   # Utility functions
│   │   ├── utils.js
│   │   ├── api.js
│   │   └── constants.js
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useMediaQuery.js
│   │
│   ├── styles/                # Additional styles
│   │   └── components.css
│   │
│   └── types/                 # TypeScript types (if using TS)
│       └── index.ts
│
├── .env.local                 # Environment variables (not committed)
├── .env.example               # Example env file
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── jsconfig.json              # Path aliases configuration
```

## Naming Conventions

### Files and Folders

- **Components**: PascalCase (e.g., `EventCard.jsx`, `NavBar.jsx`)
- **Utilities**: camelCase (e.g., `formatDate.js`, `apiHelper.js`)
- **Folders**: kebab-case or camelCase (e.g., `event-details/`, `components/`)
- **Stylesheets**: Match component name (e.g., `Button.module.css`)

### Code

- **Variables**: camelCase (e.g., `eventList`, `userName`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_FILE_SIZE`)
- **Functions**: camelCase (e.g., `fetchEvents()`, `handleSubmit()`)
- **React Components**: PascalCase (e.g., `EventCard`, `RegistrationForm`)
- **CSS Classes**: kebab-case (e.g., `event-card`, `nav-item`)

## 🎯 Development Best Practices

### Code Quality

- Write clean, readable code
- Add comments for complex logic
- Use meaningful variable and function names
- Keep components small and focused
- Follow DRY (Don't Repeat Yourself) principle

### Performance

- Optimize images (use Next.js Image component)
- Implement lazy loading where appropriate
- Minimize bundle size
- Use React Server Components when possible

### Responsiveness

- Mobile-first approach
- Test on multiple screen sizes
- Use relative units (rem, em, %) over fixed pixels
- Ensure touch-friendly UI elements

### Merge Conflicts
1. Pull latest changes from `stage`
2. Resolve conflicts in your code editor
3. Test your changes
4. Commit the resolution
5. Push to your branch

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
# Example
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
```

**Never commit `.env.local` to Git!**