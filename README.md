# Image Gallery App

This is a simple image gallery app built with React and Vite. It allows users to view a collection of images, search for images, and sign in/sign up to access additional features.

![App Screenshot](./public/Galleria.png)
![App Screenshot](<./public/Screenshot%20(204).png>)

## Features

- Browse and view a collection of images.
- Search for images by keywords.
- User authentication (Sign up and Sign in).
- Personalized experience for authenticated users.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher) and [npm](https://www.npmjs.com/).
- [Firebase](https://firebase.google.com/) account for authentication (you'll need to set up a Firebase project and obtain configuration credentials).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/samadeen/HNG-Task-3.git

   ```

2. Navigate to the project directory:

   ```bash
   cd HNG-Task-3

   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Set up Firebase Authentication:

- Create a Firebase project on the Firebase Console.
- Go to Project settings and add a web app to obtain Firebase configuration credentials.
- Replace the Firebase configuration in src/firebase.ts with your own credentials.

5. Start the development server:

   ```bash
   npn run dev

   ```

6. Open your browser and visit <http://localhost:5173> to see the app.
