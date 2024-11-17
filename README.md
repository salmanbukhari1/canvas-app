
# Project Name

This repository contains a web application built with Next.js for the frontend and Google Cloud Functions for the backend. It is designed for local development using Docker for streamlined setup and environment isolation.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Setup Instructions](#setup-instructions)
   - [Clone the Repository](#1-clone-the-repository)
   - [Environment Variables](#2-environment-variables)
   - [Docker Setup](#3-docker-setup)
   - [Running the Frontend](#4-running-the-frontend)
   - [Running the Backend](#5-running-the-backend)
   - [Interacting with Firebase](#6-interacting-with-firebase)
4. [Using the Application Locally](#using-the-application-locally)
5. [Common Commands](#common-commands)
6. [FAQ](#faq)

---

## Project Structure

```
root/
├── backend/
│   ├── functions/
│   │   ├── index.js          # Entry point for Cloud Functions
│   │   ├── package.json      # Backend dependencies
│   ├── firebase.json         # Firebase configuration
│   ├── .firebaserc           # Firebase project setup
├── frontend/
│   ├── .env                  # Frontend environment variables
│   ├── package.json          # Frontend dependencies
│   ├── public/               # Public assets
│   ├── pages/                # Next.js pages
│   ├── components/           # React components
├── keys/
│   ├── firebase/
│       ├── serviceAccountKey.json # Firebase service account key for backend
├── docker-compose.yml        # Docker configuration
├── README.md                 # Project documentation
```

---

## Prerequisites

1. **Docker**  
   Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your operating system.

2. **Git**  
   Ensure Git is installed to clone the repository:
   ```bash
   git --version
   ```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/salmanbukhari1/canvas-app.git
cd canvas-app
```

---

### 2. Environment Variables

#### Frontend
- Navigate to the `frontend/` directory and ensure the `.env` file contains the following Firebase Client SDK variables:
  ```env
  NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
  NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
  NEXT_PUBLIC_REGION=your-region
  ```

#### Backend
- Ensure the `keys/firebase/serviceAccountKey.json` file contains the Firebase Service Account Key.

---

### 3. Docker Setup

A `docker-compose.yml` file should already be present for this project.

- **Build and Start Containers:**
  ```bash
  docker-compose up --build
  ```
- **Stop Containers:**
  ```bash
  docker-compose down
  ```

---

### 4. Using the Application Locally

1. **Frontend**: Open [http://localhost:3000](http://localhost:3000) to access the Next.js app.
2. **Backend**: Access local Firebase Functions at [http://localhost:5001](http://localhost:5001).

---

Feel free to contribute or raise issues if you encounter any challenges during setup or development!
