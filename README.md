# Instagram Feed Slider - React Application

A beautiful React application built with Vite and Tailwind CSS that displays Instagram feeds in an interactive slider.

## Features

- 🎨 Beautiful slider interface using Swiper.js
- 📱 Responsive design with Tailwind CSS
- 🚀 Built with React 19 and Vite 7
- ⚡ Fast and optimized
- 🌙 Dark mode support
- 🎯 Easy Instagram API integration

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Instagram Developer Account (for API access)

### Installation

1. Clone the repository (or use the existing directory)
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Instagram API credentials to `.env`:
```
VITE_INSTAGRAM_ACCESS_TOKEN=your_access_token
VITE_INSTAGRAM_USER_ID=your_user_id
VITE_INSTAGRAM_APP_ID=your_app_id
VITE_INSTAGRAM_APP_SECRET=your_app_secret
```

### Running the Application

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Instagram API Setup

**Quick Setup for @jay5_602:**

See [INSTAGRAM_SETUP.md](./INSTAGRAM_SETUP.md) for detailed step-by-step instructions.

**Quick Summary:**
1. Ensure your Instagram account (@jay5_602) is a **Business or Creator account** connected to a Facebook Page
2. Create a Facebook App at [Facebook Developers](https://developers.facebook.com/)
3. Add "Instagram Graph API" product to your app
4. Get your Access Token with required permissions
5. Get your Instagram Business Account ID
6. Create `.env` file with your credentials (see `.env.example` format below)

## Environment Variables

Create a `.env` file in the root directory with:

```env
# Required: Your long-lived Instagram access token
VITE_INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token

# Required: Your Instagram Business Account ID (not username)
VITE_INSTAGRAM_USER_ID=your_instagram_business_account_id

# Optional: Instagram username (defaults to jay5_602)
VITE_INSTAGRAM_USERNAME=jay5_602

# Optional: For token refresh functionality
VITE_INSTAGRAM_APP_ID=your_facebook_app_id
VITE_INSTAGRAM_APP_SECRET=your_facebook_app_secret
```

**How to get these values:**
- Follow the detailed guide in [INSTAGRAM_SETUP.md](./INSTAGRAM_SETUP.md)
- Or use [Graph API Explorer](https://developers.facebook.com/tools/explorer/) to generate tokens

## Demo Mode

If you don't have Instagram API credentials set up yet, the app will automatically display demo feeds with placeholder images so you can see the slider in action.

## Technologies Used

- **React 19** - Latest React version
- **Vite 7** - Next-generation frontend tooling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Swiper.js** - Modern touch slider
- **Instagram Graph API** - For fetching Instagram feeds

## Project Structure

```
Estate/
├── src/
│   ├── components/
│   │   └── InstagramFeedSlider.jsx  # Main slider component
│   ├── services/
│   │   └── instagramService.js      # Instagram API service
│   ├── App.jsx                       # Main app component
│   ├── App.css                       # Swiper custom styles
│   ├── index.css                     # Tailwind CSS imports
│   └── main.jsx                      # Entry point
├── .env.example                      # Environment variables template
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
└── vite.config.js                    # Vite configuration
```

## Customization

### Changing Slider Settings

Edit `src/components/InstagramFeedSlider.jsx` to modify:
- `slidesPerView` - Number of slides visible
- `spaceBetween` - Space between slides
- `autoplay.delay` - Autoplay delay in milliseconds
- Breakpoints for responsive design

### Styling

Modify Tailwind classes in the component or update `tailwind.config.js` for custom themes.

## License

MIT

## Support

For issues and questions, please create an issue in the repository.