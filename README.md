# Scotbase Entertainment - Tribute Act Booking Website

A modern React-based website for booking Scotland's best tribute acts and entertainment for events.

## Features

- **Browse Artists**: View all available tribute acts with filtering and search functionality
- **Artist Profiles**: Detailed information about each act including pricing, location, and booking history
- **Featured Artists**: Showcase of highlighted performers
- **Search & Filter**: Find acts by name, tribute type, genre, or location
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Contact Form**: Easy enquiry system for booking information

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
cd scotbase
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
scotbase/
├── public/
│   ├── index.html
│   └── images/          # Artist images
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── SearchBar.js
│   │   ├── ArtistCard.js
│   │   └── FeaturedArtist.js
│   ├── pages/          # Page components
│   │   ├── Home.js
│   │   ├── Artists.js
│   │   ├── ArtistDetail.js
│   │   └── Contact.js
│   ├── data/           # Data files
│   │   └── artists.js
│   ├── utils/          # Utility functions
│   │   └── imageHelper.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Pages

- **Home** (`/`) - Landing page with featured artist and popular acts
- **Artists** (`/artists`) - Browse all available acts with search and filters
- **Artist Detail** (`/artist/:id`) - Detailed information about a specific act
- **Contact** (`/contact`) - Contact form for bookings and enquiries

## Technologies Used

- **React** - UI framework
- **React Router** - Navigation and routing
- **CSS3** - Styling with custom properties (CSS variables)
- **JavaScript ES6+** - Modern JavaScript features

## Data Management

Artist data is stored in `src/data/artists.js` as a JavaScript module. This includes:
- Artist name and tribute type
- Genre and location
- Pricing information
- Images
- Descriptions
- Booking statistics
- Availability status

## Theme Customization

The website uses CSS variables for easy theme customization. Edit `src/index.css` to change:
- Image background gradients
- Overlay colors and opacity
- And more...

```css
:root {
  --image-bg-gradient-start: #667eea;
  --image-bg-gradient-end: #764ba2;
  --image-overlay-start: rgba(102, 126, 234, 0.1);
  --image-overlay-end: rgba(118, 75, 162, 0.1);
}
```

## Image Management

See [IMAGE_SETUP.md](IMAGE_SETUP.md) for detailed information about managing images.

## Future Enhancements

- Email integration for contact form (e.g., EmailJS)
- Live chat/instant messaging feature
- Admin panel for managing artists
- Online booking system with calendar
- Payment integration
- Customer reviews and testimonials
- Video content for artist profiles
- Social media integration

## Contributing

This is a private project for Scotbase Entertainment.

## License

Copyright © 2026 Scotbase Entertainment Ltd. All rights reserved.

