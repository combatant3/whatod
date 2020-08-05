# README

## To Do
- When a course is deleted, also delete all the grade components and assignments associated to it.
- Add an edit page for assignments.
- Add a recurring option for assignments.
- Add a timestamp to the dueDate for assignments.
- Add user password authentication.
- Add an edit page for grade components.

## About
NextPls is a tool for students that automatically prioritizes their assignments for them, based on the relative weight an assignment has on their overall course grade and how soon the assignment is due.

## Recommended Development Tools
macOS is the most recommended platform for development. If you are developing on Window or Linux, it is up to you to find alternative programs.
- MAMP for macOS
- MySQLWorkbench

## Setup Instructions
1. Clone the repository into your Projects directory.
2. Install Node.js version 14.
3. Install sails with `npm install sails -g`.
4. Run MAMP and turn on the server.
5. Setup a local mysql database named "nextpls" using MySQLWorkbench.
6. In the project directory, run `sails lift`.