# Spend Tracker

This is a submission for a mock **Spend Tracker** feature for the ***Empower Frontend Engineering Challenge***.

The app is built in ***React***, utilizing `JavaScript`, `TypeScript`, `HTML`, and `CSS`.

It leverages **[Tailwind](https://tailwindcss.com/docs/guides/vite)**, **[Framer Motion](https://www.framer.com/motion/)** and **[Material Icons](https://mui.com/material-ui/material-icons/)**.

I've also built a [CRUD API](https://github.com/jdigi/spend_tracker_backend/tree/main) hosted on Vercel to provide a simple backend for testing this app.

**Start Client**
```
npm install
npm run dev
```

## Overview
Based on the given time window I was able to:
- create a unified aesthetic
- build a responsive layout
- build a fully functioning React app that communicates with an API

### This app includes the following ***Spend Tracker*** features:
- Dashboard with Account and Tracker listing
- Account Detail page with Transaction listing
- Tracker Detail page
- Add, Edit and Delete functionality for Accounts and Trackers
- Logic to ***Create Transactions*** for testing purposes

Given more time I would have attempted to include the following missing requirements:
- A **Spend Analyzer** component leveraging a library like [React Charts](https://react-charts.tanstack.com/) to create an engaging visualization for user to see thier spending over a period of time.
- Testing integration via ***React Testing Library*** and possibly ***Vitest***

## Assumptions 
**Backend:** Though this build utilizes a simple active API, it assumes that in a real-world setting the actual backend would be much more comprehensive and provide a more detailed schema and logic such as connecting transactions to accounts.

**Security:** Based on the timeline, this app also assumes there would be authentication setup on this client, possibly via User auth and tokens.

