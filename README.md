# TravelTrucks

<!-- Frontend web application for the TravelTruck company, which specializes in camper van rentals. The project is built with Next.js + TypeScript using the App Router, server-side API integration, and catalog pagination. -->

## Main Features

- Home page with a hero banner and a View Now CTA button;
- Camper catalog with backend filtering by:
    - location;
    - body type;
    - engine type;
    - transmission type;
- Card pagination in Load more format (4 items per request);
- Opening the camper detail page in a new tab;
- Detail page with:
    - image gallery;
    - user reviews;
    - five-star rating display;
    - booking form with backend submission;
    - toast notification after successful booking;
- Loading, error, and empty state handling.


## Pages Structure

- `/` — Home page
- `/catalog` — Camper catalog
- `/catalog/[camperId]` — Selected camper detail page


## Installation
```bash
npm install
```

2. Run Development Server:

```bash
npm run dev


## Commands

```bash
npm run dev

## Author

- Dmytro Liashenko
- Email: `dimka4545452@gmail.com`
