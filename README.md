# Multi-Bet Interface Challenge

## Overview

This project is a React application for a multi-bet selection interface. It demonstrates UI/UX skills, React component architecture, and the ability to handle complex form interactions.

**Tech Stack:**

- React (with TypeScript & Vite)
- [json-server](https://www.npmjs.com/package/json-server) (for local API mocking)

---

## Part 1: Data Setup

- The app uses a local `json-server` as a backend.
- Sports games data can be populated using a script or mock data.
- **Script `initGameJsonObj.ts`** is provided in `/server`.  
  This script fetches and parses data from [the-odds-api.com](https://the-odds-api.com/) and generates a ready-to-use `games.json` (or `db.json`) file for your local backend.
- Each game includes teams, timing, and betting odds.

**To start the backend:**

```bash
npx json-server server/data/db.json --port 3001
```

Initial structure:

```json
{
  "games": [],
  "bets": []
}
```

---

## Part 2: Multi-Bet Selection Interface

### Game Selection

- Displays available games in a clean, scannable format.
- Filtering options (by sport, date, etc.).
- Users can select multiple games with clear visual feedback.
- Shows relevant game information (teams, time, odds).

### Bet Configuration

For each selected game, users can configure:

- Bet type (Home Win, Draw, Away Win)
- Stake amount (€1 - €1000)

### Global Controls

- "Accept Terms & Conditions" checkbox
- Submit button for all selected bets

### Validation Requirements

- At least one game must be selected
- Each selected game needs both bet type and stake
- All stakes must be valid numbers within range
- Terms must be accepted before submission
- Clear, non-intrusive error feedback

### UX Expectations

- Smooth, responsive interactions
- Immediate visual feedback for user actions
- Mobile-friendly design
- Thoughtful loading and error states

---

## Part 3: Form Submission

- Validates the entire form before submission
- Submits bets to the local backend (`POST /bets`)
- Shows appropriate loading, success, and error states
- Clears the form after successful submission

---

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the backend:**

   ```bash
   npx json-server server/data/db.json --port 3001
   ```

3. **Start the frontend:**
   ```bash
   npm run dev
   ```

---

## Folder Structure

- `/src` — React application source code
- `/server` — Scripts and data for json-server

---

## Notes

- The focus is on UI/UX and React logic, not on backend complexity.
- You can use mock data or fetch real data from [the-odds-api.com](https://the-odds-api.com/) for initial population.

---
