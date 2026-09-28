# TaskNote — React To-Do & Notes App

Minor Project 04 — Web Development

## Project Overview

TaskNote is a responsive React.js application containing two mini applications:

1. To-Do App — manage daily tasks.
2. Notes App — create and organize notes.

The project demonstrates React functional components, JSX, props, state management with `useState`, side effects with `useEffect`, event handling, conditional rendering and list rendering with `.map()`.

## Features Implemented

### To-Do App
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Edit existing tasks
- Display Completed/Pending status
- Responsive interface
- Filter: All / Pending / Completed
- Search tasks
- Optional due dates
- Local Storage persistence
- Clear completed tasks

### Notes App
- Create notes
- Edit notes
- Delete notes
- Organized card layout
- Responsive interface
- Search notes
- Categories: General / Work / Study / Personal
- Local Storage persistence
- Note timestamps

## Technologies Used

- React.js
- JavaScript ES6+
- HTML5
- CSS3
- Vite
- Lucide React icons
- Browser Local Storage

## JavaScript Concepts

- Arrow functions
- Template literals
- Destructuring
- Spread operator
- `let` and `const`
- `map()`
- `filter()`
- `find()` concept demonstrated through component/data operations
- Object manipulation

## Project Structure

```text
Minor_Project_04_React/
├── src/
│   ├── components/
│   │   ├── NoteCard.jsx
│   │   ├── NotesApp.jsx
│   │   ├── TodoApp.jsx
│   │   └── TodoItem.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Setup Instructions

### 1. Install Node.js

Use a current LTS version of Node.js.

### 2. Open the project folder

Open the folder in VS Code or another editor.

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Then open the local URL shown by Vite.

### 5. Create a production build

```bash
npm run build
```

## Data Storage

Tasks and notes are stored in the browser's Local Storage, so data remains available after refreshing the page on the same browser.

## GitHub Submission

Upload the complete project folder to GitHub and submit the repository link through the LMS submission form.

## Project Requirement Mapping

The implementation follows the Minor Project 04 requirements for:
- React.js
- Component-based architecture
- Props and State
- `useState`
- `useEffect`
- Event handling
- Conditional rendering
- `.map()` list rendering
- Reusable components
- Responsive design
- Clean project organization
- README documentation
