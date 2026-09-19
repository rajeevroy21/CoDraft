# CoDraft

**CoDraft** is a real-time collaborative text editor built for shared writing. Multiple users can open the same document, type simultaneously, see each other's presence and cursors, and collaborate without overwriting each other's changes.

## 🚀 Live Demo

- **Frontend:** https://co-draft-eight.vercel.app/
- **Backend:** https://codraft-2k92.onrender.com/health
- **GitHub:** https://github.com/rajeevroy21/CoDraft

---

## ✨ What the Project Does

CoDraft focuses on making collaborative document editing feel truly real-time.

Users can:

- Create and open documents
- Edit the same document from multiple browser windows
- See collaborator presence indicators
- See colored collaborator cursors
- Use rich-text formatting
- Persist documents
- Browse revision history
- Restore previous document revisions
- Collaborate without manually resolving editing conflicts

> **Note:** CoDraft is currently a shared-workspace demo. Anyone with a document URL can open and edit it. Authentication and access control are intentionally outside the current scope.

---

## 🎯 Requirement Mapping

### Required Features

| Requirement | Implementation |
|---|---|
| Real-time synchronization | Yjs + Hocuspocus WebSocket |
| User presence | Yjs Awareness |
| Cursor tracking | Tiptap CollaborationCursor |
| Conflict resolution | Yjs CRDT |
| Text formatting | Tiptap |
| Document persistence | MongoDB |
| Revision history | MongoDB revision snapshots |
| Revision restore | One-click restore |

### Technical Requirements

- WebSocket-based real-time communication
- CRDT-based collaborative editing
- Node.js backend
- React frontend
- MongoDB persistence

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Tiptap
- Yjs
- Hocuspocus Provider

## Backend

- Node.js
- Express
- TypeScript
- Hocuspocus
- Yjs
- MongoDB
- Mongoose

## Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

# 🏗 Architecture Overview

CoDraft consists of two primary applications.

## 1. Client

The React client provides:

- Landing page
- Document dashboard
- Collaborative editor
- Presence indicators
- Cursor sharing
- Rich-text formatting
- Revision history

The editor uses **Tiptap** for rich-text editing and connects to the collaboration server through **Yjs + Hocuspocus**.

## 2. Server

The Node.js server provides:

- REST APIs for documents
- REST APIs for revisions
- Hocuspocus WebSocket server
- MongoDB persistence
- Revision snapshot management

---

# 🔄 Collaboration Flow

1. A user opens a document.
2. The client connects to the Hocuspocus WebSocket server.
3. Yjs creates and maintains the shared document state.
4. Users make edits simultaneously.
5. Yjs synchronizes changes between connected clients.
6. CRDT operations merge concurrent changes without traditional last-write-wins conflicts.
7. Hocuspocus manages the real-time collaboration connection.
8. Document state is persisted to MongoDB.
9. Revision snapshots are stored separately for history and restoration.

---

# 🧩 Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│                                                             │
│   React + Tiptap + Yjs + HocuspocusProvider                │
│                                                             │
└─────────────────────────────┬───────────────────────────────┘
                              │
                    HTTPS / WebSocket
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Node.js Server                           │
│                    Render Deployment                        │
│                                                             │
│  HTTP  → Express REST API                                  │
│          - Documents                                       │
│          - Revisions                                       │
│                                                             │
│  WS    → Hocuspocus                                        │
│          - Yjs synchronization                             │
│          - Presence / Awareness                            │
│          - Collaborative editing                           │
│                                                             │
└─────────────────────────────┬───────────────────────────────┘
                              │
                           Mongoose
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       MongoDB Atlas                         │
│                                                             │
│  documents:                                                 │
│    - title                                                  │
│    - yjsState                                               │
│    - timestamps                                             │
│                                                             │
│  revisions:                                                 │
│    - documentId                                             │
│    - yjsState                                               │
│    - contentPreview                                         │
│    - timestamps                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# 🧠 How It Works

The HTTP API and WebSocket collaboration server run on the same backend service.

Regular HTTP requests are handled by Express, while WebSocket connections are handled by Hocuspocus.

Yjs represents the collaborative document as a binary CRDT state.

When a user opens a document:

```text
Client
  ↓
Hocuspocus WebSocket
  ↓
Load document state
  ↓
Yjs CRDT
  ↓
Collaborative editing
  ↓
Persist state to MongoDB
```

Document state is persisted in MongoDB, while revision snapshots are maintained separately for revision history.

---

# 🧮 Why CRDTs?

Collaborative editing becomes difficult when multiple users modify the same document simultaneously.

A traditional **Last Writer Wins (LWW)** approach can cause one user's changes to overwrite another user's changes.

### The Problem

Imagine two users editing the same sentence:

```text
User A → "Hello world!"
User B → "Hello CoDraft!"
```

With a simple last-write-wins system, one update could replace the other.

This can lead to:

- Data loss
- Lost user intent
- Race conditions
- Poor collaborative UX

### The Solution

CoDraft uses **Yjs**, a CRDT implementation designed for collaborative applications.

Yjs allows concurrent updates to be merged into a consistent shared state without requiring users to manually resolve ordinary concurrent editing conflicts.

---

# 📁 Project Structure

```text
CoDraft/
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.ts
│
└── server/
    ├── src/
    ├── package.json
    ├── tsconfig.json
    └── ...
```

---

# 📚 Stack

| Layer | Technology |
|---|---|
| Editor | Tiptap |
| CRDT | Yjs |
| WebSocket | Hocuspocus |
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

# 💻 Local Setup

## Prerequisites

- Node.js 20+
- npm
- MongoDB Atlas account or local MongoDB

## Clone the Repository

```bash
git clone https://github.com/rajeevroy21/CoDraft.git
cd CoDraft
```

---

## Backend Setup

```bash
cd server
npm install
```

Create:

```text
server/.env
```

Add:

```env
PORT=3001
MONGODB_URI=<your_mongodb_connection_string>
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Run the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3001
```

---

## Frontend Setup

Open another terminal:

```bash
cd client
npm install
```

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

Run the frontend:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🌐 Production Environment Variables

## Frontend — Vercel

The production frontend uses:

```env
VITE_API_URL=https://codraft-2k92.onrender.com
VITE_WS_URL=wss://codraft-2k92.onrender.com
```

The `wss://` protocol is used because the production frontend is served over HTTPS.

## Backend — Render

The backend uses environment variables similar to:

```env
MONGODB_URI=<your_mongodb_connection_string>
CLIENT_URL=https://co-draft-eight.vercel.app
NODE_ENV=production
```

Render provides the production `PORT` automatically.

---

# 🚀 Deployment

## Backend — Render

The backend is deployed on Render.

### Configuration

**Root Directory**

```text
server
```

**Build Command**

```bash
npm install --include=dev && npm run build
```

**Start Command**

```bash
npm start
```

### Environment Variables

```env
MONGODB_URI=<your_mongodb_connection_string>
CLIENT_URL=https://co-draft-eight.vercel.app
NODE_ENV=production
```

### Backend URL

```text
https://codraft-2k92.onrender.com
```

Health check:

```text
https://codraft-2k92.onrender.com/health
```

---

# ▲ Frontend — Vercel

The frontend is deployed using Vercel.

### Configuration

**Root Directory**

```text
client
```

**Framework**

```text
Vite
```

**Build Command**

```bash
npm run build
```

**Output Directory**

```text
dist
```

**Install Command**

```bash
npm install
```

### Environment Variables

```env
VITE_API_URL=https://codraft-2k92.onrender.com
VITE_WS_URL=wss://codraft-2k92.onrender.com
```

### Production URL

```text
https://co-draft-eight.vercel.app/
```

---

# 🔗 Repository Links

- **Live Application:** https://co-draft-eight.vercel.app/
- **Backend Health:** https://codraft-2k92.onrender.com/health
- **GitHub Repository:** https://github.com/rajeevroy21/CoDraft

---

# 👥 Shared Workspace Model

Every document is currently accessible to anyone who has its URL.

There are currently:

- No user accounts
- No authentication
- No document ownership
- No access-control system

This is intentional for the current collaborative-editor implementation. The focus is on real-time synchronization, CRDT-based conflict resolution, persistence, and revision management.

---

# ⚠️ Known Limitations

- No authentication or authorization
- Anyone with a document URL can edit it
- Revision restore may require a page reload to fully reflect the restored state
- Render's free infrastructure may experience cold starts after inactivity
- Mobile editor layout is functional but the toolbar is compact on smaller screens

---

# 🤖 AI Tools Used

- ChatGPT
- Claude

Claude was used for architectural guidance and debugging. ChatGPT was used for development assistance, debugging, and implementation guidance.

All integration decisions, design choices, and final implementation were reviewed and adjusted manually.

---

# 📊 Scoring Rubric Alignment

| Criterion | Implementation |
|---|---|
| Real-time synchronization | Yjs + Hocuspocus WebSocket |
| Conflict resolution | Yjs CRDT |
| Presence indicators | Yjs Awareness |
| Cursor tracking | Tiptap CollaborationCursor |
| Rich-text formatting | Bold, italic, underline, headings, lists, code |
| Persistence | MongoDB + Yjs binary state |
| Revision history | Periodic revision snapshots |
| Revision restore | Revision panel + restore functionality |
| WebSocket communication | Hocuspocus WebSocket server |
| Backend | Node.js + Express |
| Frontend | React + Vite + TypeScript |

---

# 📄 License

Released under the **MIT License**.

See [LICENSE](./LICENSE).