# 🏛️ VoteWise: Democracy, Demystified.

[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-blue?logo=google-gemini&style=for-the-badge)](https://aistudio.google.com/)
[![Firebase](https://img.shields.io/badge/Auth-Firebase-orange?logo=firebase&style=for-the-badge)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/Code-TypeScript-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)

**VoteWise** is a production-grade Civic Technology platform designed to bridge the gap between complex election bureaucracy and citizen action. By combining **Google Gemini's** generative intelligence with **Firebase's** secure infrastructure, VoteWise provides a personalized, non-partisan roadmap for every voter.

---

## 🎯 Chosen Vertical: Civic Technology & Education
Election laws are notoriously fragmented and filled with legal jargon. VoteWise targets this friction point, providing a "Voter's Co-pilot" that ensures no citizen is disenfranchised by confusion.

## 🚀 Key Features

### 🤖 1. AI Civic Assistant (Powered by Gemini 1.5 Flash)
- **Natural Language Querying**: Ask complex questions like *"How do I register in NY if I'm a student?"* or *"What does Prop 1A actually mean?"*
- **Context-Aware History**: Remembers your previous questions to provide a seamless conversational experience.
- **Non-Partisan by Design**: Guided by a strict system prompt to ensure unbiased, source-backed answers.

### 🔐 2. Secure Voter Journey (Firebase Auth)
- **Google One-Tap Login**: Seamless authentication with Firebase.
- **Privacy-First**: Uses generic shape avatars and encrypted sessions to protect voter identity.

### 📅 3. Dynamic Election Timeline
- **Staggered Motion UI**: An interactive, animated timeline tracking every major deadline (Registration, Early Voting, Election Day).
- **Phase-Based Tracking**: Automatically categorizes events to help users prioritize their actions.

### 📍 4. Polling Station AI
- **Smart Locator**: Detailed mock-up of an interactive map that filters polling places by accessibility features and reported wait times.

### 📖 5. Ballot Decoder
- **Jargon-to-English**: Pastes complex proposition text and gets a "Plain English" translation of what a 'Yes' vs. 'No' vote actually means.

---

## 🧠 Approach & Logic

### Architecture
- **State Management**: Built with **Zustand** for high-performance, lightweight global state (Auth and Chat).
- **Animation Engine**: Powered by **Framer Motion** to create a "Premium Flow" that feels responsive and alive.
- **Design System**: A custom-built CSS variable system (in `tokens.css`) using **Tailwind CSS v4** for rapid, consistent styling.

### AI Implementation Logic
The Chat system uses a **System Instruction layer** that constrains the LLM to:
1. NEVER endorse candidates.
2. ALWAYS cite official sources.
3. Focus on the PROCESS of democracy rather than the outcomes.

---

## 🛠️ How the Solution Works

1.  **Onboarding**: Users land on a high-fidelity hero page and can instantly ask a question.
2.  **Authentication**: Users sign in with Google to "Unlock their Journey."
3.  **Interaction**: The user interacts with the Gemini-powered chat or the interactive ballot decoder.
4.  **Action**: The platform provides direct links to official `.gov` portals, bridging the gap between "knowing" and "doing."

---

## 📋 Evaluation Focus Areas

### 💻 Code Quality
- Strict **TypeScript** for type safety and maintainability.
- Modular component architecture (UI vs. Pages vs. Services).
- Clean, documented code following industry standards.

### 🔒 Security
- **Environment Isolation**: All API keys are stored in `.env` and excluded from Git via `.gitignore`.
- **Firebase Auth**: Industry-standard secure authentication.
- **AI Safety**: Robust system prompts prevent the LLM from being manipulated into partisan responses.

### ⚡ Efficiency
- Uses **Vite** for sub-second hot module replacement.
- **Gemini 1.5 Flash** selected for the optimal balance of reasoning speed and low token cost.
- Lightweight assets and optimized CSS for fast mobile loading.

### ♿ Accessibility
- Full **ARIA** labeling for all interactive elements.
- Keyboard navigation support (Esc to close modals, Tab through forms).
- High-contrast color scales for readability.

---

## ⚠️ Assumptions Made
1. Users have a basic internet connection for Gemini/Firebase calls.
2. Election data provided via Gemini is accurate as of its training data (mitigated by directing users to official sources).
3. Local polling data is based on mock APIs for this prototype, ready to be connected to real-time Google Maps/Civic APIs.

---

## 🛠️ Installation & Setup

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Create a `.env` file with your `VITE_GEMINI_API_KEY` and `VITE_FIREBASE_*` credentials.
4.  Run development server: `npm run dev`
5.  Build for production: `npm run build`


