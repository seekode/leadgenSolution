# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LeadGen Solutions is a static business website for a B2B lead generation company. The site is built with vanilla HTML, CSS, and JavaScript, focusing on performance, accessibility, and professional presentation.

## Architecture & Structure

### Core Technologies
- **Frontend**: Static HTML5 with semantic structure
- **Styling**: CSS3 with custom properties (CSS variables) and modern techniques
- **JavaScript**: ES6+ vanilla JavaScript with IIFE patterns and modern APIs
- **Design System**: Comprehensive JSON-based design system with detailed specifications

### Key Files & Directories
- `index.html` - Main landing page with complete business presentation
- `assets/css/style.css` - Main stylesheet with CSS custom properties
- `assets/js/script.js` - Core application functionality
- `assets/js/cookies.js` - GDPR-compliant cookie management system
- `design.json` - Complete design system specifications
- `README.md` - Detailed business content and copy guidelines

### Design System Implementation
The project uses a comprehensive design system defined in `design.json`:
- **Color palette**: Primary blue (#0f8cc8) with gradients and neutral colors
- **Typography**: System fonts with defined scales and weights
- **Spacing system**: Consistent rem-based spacing tokens
- **Component styling**: Detailed specifications for cards, buttons, forms
- **Responsive behavior**: Defined breakpoints and adaptive patterns

## Key Features & Components

### JavaScript Functionality (`assets/js/script.js`)
- **Navigation**: Mobile-responsive menu with hamburger toggle
- **Smooth scrolling**: Anchor link navigation with header offset
- **Form validation**: Real-time validation with accessibility support
- **Lazy loading**: Image optimization with IntersectionObserver
- **Animations**: Scroll-triggered animations for enhanced UX
- **Accessibility**: Keyboard navigation support and ARIA compliance

### Cookie Management (`assets/js/cookies.js`)
- **GDPR compliance**: Full cookie consent management system
- **Granular control**: Separate categories (necessary, analytics, marketing, functional)
- **Persistent storage**: Preference saving with 365-day expiry
- **Dynamic modal**: Customizable consent interface
- **Analytics integration**: Google Analytics integration with consent handling

### Styling Philosophy
- **CSS Custom Properties**: Extensive use of CSS variables for maintainability
- **Mobile-first**: Responsive design with progressive enhancement
- **Component-based**: Modular CSS classes following the design system
- **Performance optimized**: Minimal CSS with efficient selectors

## Development Guidelines

### Code Style & Patterns
- Use semantic HTML5 elements with proper ARIA attributes
- Follow the established CSS custom property naming convention
- Maintain IIFE pattern for JavaScript modules to avoid global pollution
- Implement proper error handling and graceful degradation

### Design System Adherence
- **Colors**: Always use CSS custom properties from `:root` declarations
- **Typography**: Follow the established font scales and weights
- **Spacing**: Use the consistent spacing tokens (--spacing-*)
- **Components**: Respect the detailed component specifications in `design.json`

### Content Updates
- Business copy and content guidelines are defined in `README.md`
- Contact information and company details are centralized
- Maintain consistency with the established tone and messaging

### Performance Considerations
- Images should use lazy loading attributes
- JavaScript is loaded with `defer` attribute
- CSS uses efficient selectors and avoids complex calculations
- Form submissions are handled asynchronously

### Accessibility Standards
- Maintain proper heading hierarchy (H1 → H6)
- Ensure keyboard navigation works throughout the site
- Use proper ARIA labels and descriptions
- Implement focus management for dynamic content

## Common Development Tasks

### Adding New Sections
1. Follow the established section structure with `.section-header`
2. Use appropriate section numbering (01, 02, etc.)
3. Apply consistent spacing and typography from the design system
4. Add scroll animations using the existing animation framework

### Modifying Contact Forms
1. Ensure proper validation using the existing `validateField` function
2. Maintain accessibility attributes (`aria-required`, `aria-describedby`)
3. Test form submission flow and error handling
4. Update GDPR consent handling if collecting new data types

### Updating Styles
1. Use existing CSS custom properties rather than hard-coded values
2. Follow the component specifications in `design.json`
3. Test responsive behavior across all breakpoints
4. Maintain consistency with the established design patterns

### Cookie Management Updates
1. Update categories in `cookies.js` if adding new tracking
2. Test consent flow and preference persistence
3. Ensure analytics integration respects user choices
4. Update privacy policy links if consent requirements change

## Business Context

This website represents LeadGen Solutions, a B2B lead generation consultancy founded in 2023. The site emphasizes:
- Trust and transparency in business practices
- Technical expertise with modern tools and methodologies
- Results-driven approach with concrete metrics
- Professional presentation targeting B2B decision-makers

The content strategy focuses on conversion optimization with multiple call-to-action opportunities while maintaining GDPR compliance for the French market.