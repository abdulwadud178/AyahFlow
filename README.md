# AyahFlow - Quran Reading App

A modern Quran reading application built with React, TypeScript, and Vite.

## Features

- 📖 Interactive Quran reading with multiple script styles
- 🎵 Audio recitations
- 📝 Verse translations and tafsirs
- 🎯 Daily reading goals and streaks
- 🌙 Ayah of the day
- 📱 PWA support for offline reading

## API Integration

This app integrates with the [Quran Foundation Content API](https://quran.foundation/developers) for dynamic content.

### Setup API Credentials

1. Get your API credentials from [Quran Foundation Developers](https://quran.foundation/developers)
2. Create a `.env` file in the root directory:
   ```
   VITE_QURAN_API_CLIENT_ID=your_client_id_here
   VITE_QURAN_API_CLIENT_SECRET=your_client_secret_here
   VITE_QURAN_API_ENV=testing  # or 'production'
   ```
### CORS Handling

**Development**: The app uses Vite's proxy server to handle CORS issues during development.

**Production**: You'll need a backend server to proxy API requests, as the Quran Foundation API doesn't allow direct browser requests due to security (client credentials should not be exposed in frontend code).

### Testing the API Integration

1. **Without Credentials**: The app will use static fallback data
2. **With Credentials**: Add your API credentials to `.env` and restart the dev server

The proxy configuration in `vite.config.ts` routes API calls through your development server, avoiding CORS issues during development.

### API Features

- **Dynamic Chapters**: Fetches all 114 surahs with metadata
- **Verses**: Loads verses with Arabic text, translations, and tafsirs
- **Ayah of the Day**: Random verse from the API
- **Fallback Support**: App works with static data if API is unavailable

### API Endpoints Used

- `/chapters` - Chapter list
- `/verses/by_chapter/:id` - Verses for a chapter
- `/verses/random` - Random ayah
- `/resources/translations` - Available translations
- `/resources/recitations` - Audio recitations
- `/resources/tafsirs` - Tafsir sources

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Custom CSS variables
- **Animations**: Framer Motion
- **PWA**: Vite PWA plugin
- **API**: Quran Foundation Content API v4

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utilities and API functions
├── data/          # Static fallback data
├── types/         # TypeScript type definitions
└── assets/        # Static assets
```

## API Architecture

The app uses a hybrid approach:
- **Primary**: Dynamic data from Quran Foundation API
- **Fallback**: Static data for offline/reliability
- **Caching**: Resources cached at startup for performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with both API and fallback modes
5. Submit a pull request
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
