# LeadGen Solutions Website

Static business website for a B2B lead generation agency.

## Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom properties and modern CSS
- **JavaScript ES6+** - Vanilla JS with modern APIs
- **Design System** - JSON-based specifications

## Features

- Responsive mobile-first design
- GDPR-compliant cookie management
- Form validation with accessibility
- Scroll animations and lazy loading
- SEO optimized with structured data

## Development

### Quick Start
```bash
# Serve locally
python -m http.server 8000
# or
npx serve .
```

### Project Structure
```
├── index.html              # Main page
├── assets/
│   ├── css/style.css       # Main stylesheet
│   ├── js/script.js        # Core functionality
│   └── js/cookies.js       # GDPR cookie management
├── design.json             # Design system specs
└── [legal pages]           # GDPR compliance pages
```

### Design System
- **Primary Color**: #0f8cc8
- **Typography**: System fonts with rem-based scales  
- **Spacing**: Consistent tokens (`--spacing-*`)
- **Components**: Defined in `design.json`

## Development Notes

- Follow design system specifications in `design.json`
- Use CSS custom properties for consistency
- Maintain accessibility standards (ARIA, semantic HTML)
- Test GDPR cookie consent flow
- Validate on mobile devices

See `CLAUDE.md` for detailed development guidelines.
