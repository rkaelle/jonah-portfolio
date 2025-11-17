# Jonah Eisenman - Portfolio

A screenplay-themed portfolio website that presents content as if you're reading a script being typed in real-time.

## Features

- **Cinematic Typewriter Effect**: All content appears with a realistic typewriter animation
- **Dynamic Character Introduction**: Cycles through various job titles before settling on "Creative"
- **Scroll-Triggered Animations**: Portfolio sections animate as you scroll
- **Screenplay Formatting**: Classic Courier font with authentic screenplay margins
- **Grey Vignette Effect**: Subtle lighting effect on page edges
- **Fade to Black Transition**: Cinematic transition to contact section
- **Fully Responsive**: Works beautifully on desktop and mobile devices

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **CSS3**: Custom animations and transitions
- **Intersection Observer API**: Scroll-triggered animations

## Project Structure

```
jonah-portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── TitlePage.jsx    # Opening title sequence
│   │   ├── SceneHeading.jsx # Scene heading with time
│   │   ├── CharacterIntro.jsx # Character description animation
│   │   ├── PortfolioSection.jsx # Reusable portfolio section
│   │   ├── FadeToBlack.jsx  # Transition effect
│   │   └── ContactSection.jsx # Contact information
│   ├── hooks/               # Custom React hooks
│   │   ├── useTypewriter.js # Typewriter animation logic
│   │   └── useCharacterAnimation.js # Character title cycling
│   ├── data/                # Portfolio content data
│   │   └── portfolioData.js # Portfolio items and categories
│   ├── App.jsx              # Main app component
│   ├── App.css              # App-level styles
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Customization

### Adding Portfolio Items

Edit `src/data/portfolioData.js` to add your own portfolio items:

```javascript
export const portfolioData = {
  videos: {
    title: 'VIDEOS',
    categories: ['Animation', 'Visual Effects', 'Edits'],
    items: [
      { title: 'Your Project', image: '/path/to/image.jpg' },
      // Add more items...
    ]
  },
  // ... other sections
};
```

### Adjusting Animation Speed

Modify timing in the component files:
- `typeSpeed` in `useTypewriter.js` for typing speed
- `deleteSpeed` in `useTypewriter.js` for deletion speed
- Individual `setTimeout` delays in components for sequence timing

### Changing Styles

Each component has its own CSS file for easy customization:
- Fonts, colors, and spacing
- Animation timing and effects
- Responsive breakpoints

## Design Philosophy

This portfolio is designed to feel like reading a screenplay:
- **Minimal and Cinematic**: Clean design with purposeful animations
- **Authentic Typography**: Courier font matches real screenplays
- **Story-Driven**: Content unfolds like a narrative
- **Attention to Detail**: Cursor blinks, pauses, and deletion effects add personality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Personal portfolio site. All rights reserved.

## Contact

- Email: jonah.eisenman@gmail.com
- Phone: 612-200-7624
- LinkedIn: [linkedin.com/in/jonah-eisenman](https://www.linkedin.com/in/jonah-eisenman)
