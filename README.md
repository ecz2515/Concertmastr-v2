# Concertmastr

Concertmastr is a digital concert program platform built with Next.js, designed to replace traditional printed programs and cumbersome PDFs accessed via QR codes. It provides a streamlined, accessible, and interactive experience for concertgoers, ensuring easy navigation and real-time updates.

## Features

- **Dynamic Data Integration**: The program dynamically pulls data from a centralized JSON file (`concert.json`), making it easy to update without modifying the UI. The concert program screen presents composers' names, birth and death years, piece names, durations, movements, and soloists where applicable. It also includes an automatic intermission message when applicable.

- **Program Notes**: Each piece has dedicated program notes screens that provide deeper insight into the compositions. These screens feature auto-scrolling on navigation focus, adaptive styling for readability, and accessibility enhancements such as enhanced contrast, font scaling, True Tone, and blue light filtering.

- **Biographies Section**: Concertmastr also includes a biographies section that provides details about featured musicians and their contributions. Clicking on an artist's name leads to their dedicated biography page, which dynamically loads artist images, names, roles, and biographical information. The meet-the-orchestra section provides an overview of orchestra members with dynamically fetched images and instrument assignments.

- **Accessibility**: Accessibility is a core focus of Concertmastr, offering enhanced contrast mode for improved text visibility, dynamic font scaling, and True Tone and blue light filtering to reduce screen strain.

- **Performance and Navigation**: The platform uses Next.js for server-side rendering, ensuring fast page loads and optimal performance. Navigation is handled through a tab-based system, allowing users to quickly access different sections of the program. The back button dynamically determines the correct return path for a seamless user experience. Additionally, images are preloaded to optimize performance and avoid lag.

- **Data Management**: All program data is stored in a JSON file, allowing for easy updates without modifying the app structure. The JSON file includes metadata such as concert name, date, venue, time, version control, and artist and program details. The structure also supports multilingual capabilities for future expansions.

## Vision

Concertmastr sets a new standard for digital concert programs by offering a user-friendly, interactive, and accessibility-focused design that enhances audience engagement.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
