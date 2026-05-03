# VoteWise: Your AI-Powered Election Guide 🗳️

VoteWise is a modern, civic-tech platform designed to make democracy accessible, understandable, and engaging. By leveraging the power of **Gemini 2.0 Flash AI** and **Google Cloud**, VoteWise translates complex legal jargon into plain English, helps voters find their polling stations, and tracks critical electoral deadlines.

## 🚀 Key Features

- **Ballot Decoder (AI-Powered)**: Paste confusing ballot measure text and receive a plain-English translation of what a "Yes" or "No" vote actually means.
- **Polling Station Locator**: Real-time integration with Google Maps to find your nearest registered polling place and check accessibility features.
- **Election Timeline**: An interactive, dynamic timeline tracking registration deadlines, early voting, and election day.
- **AI Assistant**: A non-partisan, friendly AI assistant (powered by Gemini) to answer any process-related election questions.
- **Civics Glossary**: A comprehensive dictionary of electoral terms to empower first-time voters.

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion.
- **AI**: Google Gemini 2.0 Flash API.
- **Backend/Database**: Firebase (Auth, Firestore, Cloud Functions).
- **Testing**: Vitest, React Testing Library.
- **Maps**: Google Maps Javascript API.

## 📂 Project Structure

```bash
votewise/
├── frontend/           # React + Vite application
│   ├── src/            # Source code (Components, Pages, Services)
│   ├── tests/          # Unit & Integration tests
│   └── package.json    # Frontend dependencies
├── backend/            # Firebase Cloud Functions (Node.js)
├── firebase.json       # Firebase configuration
├── firestore.rules     # Database security rules
└── README.md           # This file
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- NPM or Yarn
- A Google Cloud Project with Gemini API and Maps API enabled.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ashishrox18/Prompt_Wars_votewise.git
   cd Prompt_Wars_votewise
   ```

2. **Setup Frontend**:
   ```bash
   cd frontend
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `frontend` folder:
   ```env
   VITE_GEMINI_API_KEY=your_key_here
   VITE_GOOGLE_MAPS_API_KEY=your_key_here
   VITE_FIREBASE_API_KEY=...
   # (Include other Firebase config vars)
   ```

4. **Run Locally**:
   ```bash
   npm run dev
   ```

## 🧪 Testing

We maintain a high-quality codebase with comprehensive test coverage.
To run tests:
```bash
cd frontend
npm run test
```

## 🔒 Security & Accessibility

- **Security**: Implemented `DOMPurify` for XSS protection, Zod for data validation, and strict Firestore "deny-by-default" security rules.
- **Accessibility**: Optimized for screen readers with proper ARIA roles and supports `prefers-reduced-motion` for users with motion sensitivity.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built for the Google AI Prompt Wars competition.*
