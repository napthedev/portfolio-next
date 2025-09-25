# NAPTheDev's Portfolio

My personal portfolio

<p align="center">
  <img alt="Stars" src="https://badgen.net/github/stars/napthedev/portfolio-next">
  <img alt="Forks" src="https://badgen.net/github/forks/napthedev/portfolio-next">
  <img alt="Issues" src="https://badgen.net/github/issues/napthedev/portfolio-next">
  <img alt="Commits" src="https://badgen.net/github/commits/napthedev/portfolio-next">
</p>

## Live demo

Official Website: [https://portfolio-napthedev.vercel.app/](https://portfolio-napthedev.vercel.app/)

## Main technology used

- nextjs 14 with app router, typescript
- tailwindcss
- framer-motion (animation)
- react-locomotive-scroll (parallax scroll)
- graphql ([GraphCMS](https://graphcms.com/))
- Incremental Static Regeneration (ISR) for optimized performance

## Installation

- Clone the project
- Run `npm install`
- Example .env file:

```env
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_FORM_URL=
```

- NEXT_PUBLIC_GA_ID: Google Analytics
- NEXT_PUBLIC_FORM_URL: Form to submit contact info ([endpoint.space](https://www.endpoint.space/) recommended)

- Run `npm run dev`

## ISR Implementation

This portfolio uses Incremental Static Regeneration (ISR) for optimal performance:

- **Pre-rendered at build time** for instant loading
- **Auto-revalidation every 60 seconds** to keep content fresh
- **On-demand revalidation** via webhook endpoint
- **Client components** for interactivity while maintaining static benefits

For detailed information about the ISR implementation, see [docs/ISR_IMPLEMENTATION.md](./docs/ISR_IMPLEMENTATION.md)

## Previews

![Preview 1](https://res.cloudinary.com/naptest/image/upload/v1654580156/portfolio-next/preview-1_is2ner.png)
![Preview 2](https://res.cloudinary.com/naptest/image/upload/v1654580156/portfolio-next/preview-2_ux6bh9.png)
![Preview 3](https://res.cloudinary.com/naptest/image/upload/v1654580157/portfolio-next/preview-3_clnabt.png)
![Preview 4](https://res.cloudinary.com/naptest/image/upload/v1654580156/portfolio-next/preview-4_zwp5ae.png)

## Summary

👉 If you like this project, give it a star ✨ and share 👨🏻‍💻 it to your friends 👈
