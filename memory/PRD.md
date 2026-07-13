# AcuWall Website PRD

## Original Problem Statement
Create a premium industrial technology website for AcuWall, a Hungarian company specializing in prefabricated noise barrier wall systems made of reinforced concrete and wood-composite (fabeton). The website must be in Hungarian language.

## Architecture & Tech Stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom theme
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Docker ready

## User Personas
1. **Industrial/Factory Managers** - Need noise protection for facilities
2. **Construction Companies** - Looking for noise barrier solutions for projects
3. **Residential Property Developers** - Roadside noise protection
4. **Logistics Center Managers** - Warehouse and distribution center noise reduction

## Core Requirements
- Hungarian language website
- Dark theme (#0F172A) with accent color (#FF3000)
- Pages: Főoldal, Termék, Ajánlatkérés, Kapcsolat, Munkavédelem
- Contact: acuwall@acuwall.hu, +36308305556
- Simple frontend form (no backend email integration)
- Premium Apple/Tesla inspired design
- Mobile responsive
- Docker deployment ready

## What's Been Implemented (Jan 2026)

### Pages Completed
1. **Főoldal (Homepage)**
   - Hero section with parallax background
   - Bemutatkozás (Introduction)
   - Előnyök (Advantages) grid
   - Hogyan működik (How it works) 3-step process
   - Galéria (Gallery) with product images
   - CTA section

2. **Termék és szolgáltatások (Products)**
   - Product hero
   - Product details
   - Cross-section visualization with scroll animation
   - Technical specifications (panel dimensions, certifications)
   - Services list
   - Applications grid

3. **Ajánlatkérés (Quote Request)**
   - Full quote form with all required fields
   - Yes/No radio buttons for project requirements
   - Form submission with success message
   - Form reset functionality

4. **Kapcsolat (Contact)**
   - Email and phone cards
   - Location information
   - Response time indicator

5. **Munkavédelem (Work Safety)**
   - Hero section
   - Services grid
   - Project types
   - Benefits
   - Related services CTA

### Components Created
- Header with sticky navigation
- Footer with logo, links, contact
- Mobile responsive navigation
- All home page sections
- All product page sections
- Quote form with validation
- Safety page components

### Assets Used
- Company logo
- Cross-section photo
- Panel texture image
- Night wall installation photo
- Day wall installation photo

## Prioritized Backlog

### P0 (Critical) - Done
- [x] All 5 pages implemented
- [x] Navigation working
- [x] Mobile responsive
- [x] Form functionality
- [x] Docker configuration

### P1 (High Priority) - Future
- [ ] SEO optimization (meta tags, structured data)
- [ ] Image optimization (WebP conversion)
- [ ] Performance optimization (lazy loading)
- [ ] Accessibility improvements

### P2 (Medium Priority) - Future
- [ ] Cookie consent banner
- [ ] Analytics integration
- [ ] CMS integration (Sanity/Strapi)
- [ ] Multi-language support

### P3 (Low Priority) - Future
- [ ] Blog section
- [ ] Project gallery/portfolio
- [ ] FAQ page
- [ ] Video integration

## Next Tasks
1. Deploy to production server using Docker
2. Set up custom domain
3. Add Google Analytics
4. Create sitemap.xml
5. Add robots.txt

## Files Structure
```
/app/acuwall-website/
├── src/
│   ├── app/
│   │   ├── page.tsx (Főoldal)
│   │   ├── termek/page.tsx
│   │   ├── ajanlatkeres/page.tsx
│   │   ├── kapcsolat/page.tsx
│   │   └── munkavedelem/page.tsx
│   └── components/
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── home/
│       ├── product/
│       ├── quote/
│       └── safety/
├── public/images/
├── Dockerfile
├── docker-compose.yml
└── README.md
```
