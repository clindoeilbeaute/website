# Clin d'oeil beauté - Website

A professional beauty salon website built with Jekyll, showcasing specialized beauty treatments and services.

## Features

- Detailed service pages for specialized treatments
  - Bio Microneedling
  - Lash Lift
  - Bio-Therapeutic facials
  - Facial treatments (GERnétic & Corpa Flora)
  - Pure Anada products
- Comprehensive pricing information
- Photo gallery
- Contact information
- Responsive design for all devices
- Bilingual support

## Technical Stack

- Static site generator: Jekyll
- CSS Framework: Custom styling
- Image optimization for fast loading
- SEO optimized structure
- Hosted on GitHub Pages

## Local Development

### Prerequisites

- Ruby (recommended version: 2.7.0 or newer)
- RubyGems
- Bundler
- Jekyll

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd website
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Run the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. View the site at `http://localhost:4000`

## Project Structure

```
.
├── _config.yml          # Jekyll configuration
├── _includes/          # Reusable components
│   ├── header.html
│   └── footer.html
├── _layouts/           # Page templates
│   └── default.html
├── assets/            # Static files
│   ├── css/
│   ├── js/
│   └── images/
└── pages/             # Content pages
    ├── bio-microneedling/
    ├── bio-therapeutic/
    ├── lash-lift/
    ├── price/
    └── photos/
```

## Content Management

- All service pages are in Markdown format
- Images should be optimized before adding to `assets/images/`
- Pricing updates should be made in `pages/price/index.md`

## Contributing

1. Create a new branch for your changes
2. Make your changes
3. Test locally using `bundle exec jekyll serve`
4. Submit a pull request

## License

This website is proprietary and confidential. All rights reserved.

## Contact

For any questions or issues regarding the website, please contact the site administrator.