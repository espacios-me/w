# BotSpace Dashboard

A real-time WhatsApp conversation analytics dashboard with AI-powered insights, built with React, TypeScript, and Tailwind CSS. Integrates with BotSpace API and Google Gemini AI.

**Live Dashboard:** https://espacios.me/bot

## Features

- **Real-time Analytics**: Live WhatsApp conversation tracking and statistics
- **Interactive Charts**: Pie charts and bar charts for conversation status visualization
- **AI Insights**: Google Gemini AI-powered conversation analysis and recommendations
- **Responsive Design**: Mobile-first design with dark theme
- **Auto-refresh**: 30-second auto-refresh interval for live data
- **Error Handling**: Graceful error handling with retry functionality

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Build**: Vite, esbuild
- **Charting**: Recharts
- **UI Components**: shadcn/ui with Radix UI
- **Icons**: Lucide React
- **Deployment**: Cloudflare Workers
- **APIs**: BotSpace Public API, Google Gemini AI

## Prerequisites

- Node.js 18+
- pnpm 10.4.1+
- Cloudflare account with domain (espacios.me)
- BotSpace API key
- Google Gemini API key

## Local Development

### Setup

```bash
# Clone the repository
git clone https://github.com/espacios-me/b.git
cd b

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` with:

```env
BOTSPACE_CHANNEL_ID=690c66ec2a221421bdc2b6d1
BOTSPACE_API_KEY=botspace_5ed2f2b9-d7e2-444f-9dee-3411273c5848
GEMINI_API_KEY=AIzaSyBDW85y2XgKnmeGJ2DSEX5qZZbQPW_Pri0
```

### Development Server

```bash
# Start development server
pnpm dev

# Server runs on http://localhost:3000
```

### Build

```bash
# Build for production
pnpm build

# Output: dist/public/ (static files) and dist/index.js (server)
```

### Type Checking

```bash
# Run TypeScript type check
pnpm check
```

### Code Formatting

```bash
# Format code with Prettier
pnpm format
```

## Project Structure

```
b/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── contexts/      # React contexts
│   │   ├── App.tsx        # Main app component
│   │   ├── main.tsx       # React entry point
│   │   └── index.css      # Global styles
│   └── index.html         # HTML template
├── server/                # Express server
│   └── index.ts          # Server entry point
├── shared/               # Shared types
├── .github/workflows/    # GitHub Actions CI/CD
├── worker.js            # Cloudflare Worker
├── wrangler.toml        # Cloudflare configuration
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Deployment

### Automatic Deployment (GitHub Actions)

The project uses GitHub Actions for continuous deployment. Every push to the `main` branch triggers:

1. **Build**: Compiles React and TypeScript
2. **Test**: Verifies build artifacts
3. **Deploy**: Deploys to Cloudflare Workers

### Manual Deployment

```bash
# Build the project
pnpm build

# Deploy to Cloudflare
pnpm deploy
```

### Deployment Configuration

The deployment is configured via:

- **GitHub Actions**: `.github/workflows/deploy.yml`
- **Cloudflare**: `wrangler.toml`
- **Worker**: `worker.js`

### Required GitHub Secrets

Set these secrets in the GitHub repository settings:

| Secret | Value |
|--------|-------|
| `CLOUDFLARE_API_TOKEN` | Your Cloudflare API token |
| `CLOUDFLARE_ACCOUNT_ID` | b1b843ec85bc39a3a4d370ba4f84f17a |

## API Integration

### BotSpace API

Fetches WhatsApp conversation data from BotSpace:

- **Base URL**: https://public-api.bot.space
- **Endpoint**: `/v1/{channelId}/conversation`
- **Authentication**: API key query parameter
- **Response**: Array of conversations with metadata

### Google Gemini AI

Generates AI-powered insights for conversations:

- **Model**: gemini-1.5-flash
- **Features**: Summarization, sentiment analysis, topic extraction, recommendations
- **Integration**: Client-side API calls (no backend proxy needed)

## Monitoring

### Cloudflare Analytics

Monitor dashboard performance via Cloudflare:

- Page views and unique visitors
- API response times
- Error rates
- Cache hit ratio

### Error Tracking

Errors are logged to browser console. For production monitoring, integrate:

- Sentry (error tracking)
- LogRocket (session replay)
- New Relic (performance monitoring)

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Deployment Fails

1. Verify Cloudflare credentials in GitHub Secrets
2. Check GitHub Actions logs for detailed error messages
3. Ensure `wrangler.toml` is properly configured
4. Verify API keys are valid

### Dashboard Shows No Data

1. Check BotSpace API key is valid
2. Verify channel ID is correct
3. Check browser console for API errors
4. Ensure CORS is enabled on BotSpace API

### AI Insights Not Loading

1. Verify Gemini API key is valid
2. Check API quota limits
3. Review browser console for errors
4. Ensure API key has necessary permissions

## Performance Optimization

- **Code Splitting**: Vite automatically chunks code
- **Lazy Loading**: Routes are lazy-loaded
- **Caching**: 1-hour browser cache for assets
- **CDN**: Cloudflare CDN caches static files globally
- **Compression**: Gzip compression enabled

## Security

- **API Keys**: Stored in GitHub Secrets (not in code)
- **HTTPS**: All traffic encrypted via Cloudflare SSL/TLS
- **CORS**: Configured for BotSpace and Gemini APIs
- **Rate Limiting**: Cloudflare rate limiting enabled
- **DDoS Protection**: Cloudflare DDoS protection active

## Contributing

1. Create a feature branch
2. Make changes and test locally
3. Push to GitHub
4. Create a pull request
5. GitHub Actions will automatically test and deploy

## License

MIT

## Support

For issues or questions:

1. Check GitHub Issues
2. Review error logs in `.manus-logs/`
3. Check Cloudflare dashboard for deployment status
4. Review GitHub Actions workflow logs

## Deployment Status

- **Production**: https://espacios.me/bot
- **Status**: Active and monitoring
- **Last Deployment**: Check GitHub Actions
- **Uptime**: Monitored via Cloudflare

---

**Built with ❤️ for BotSpace WhatsApp Analytics**
