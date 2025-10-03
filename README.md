# Vocabulary Flashcards Generator

A simple web app that lets you create and download beautiful vocabulary flashcards instantly. Built with **HTML, CSS, and JavaScript** (no frameworks, no dependencies except `html2canvas` for image export).

![Screenshot of Vocabulary Flashcards Generator](</assets/images/vfg-screenshot.jpg>)

## Who is this app for?

This flashcard generator is designed for:

- Language Learners – to practice vocabulary, pronunciation, and meanings interactively.
- Teachers – to quickly generate digital or printable flashcards for lessons.
- Parents – to make fun and simple flashcards for kids.

## Features

- Create custom vocabulary flashcards with **word**, **pronunciation**, **parts of speech**, and **definition** fields.
- For **definition**, you can use `Ctrl+B` / `Cmd+B` or wrap text in `**` to make it **bold**.
- Live **preview** of your flashcard before downloading.
- Export flashcards as **PNG images** using [html2canvas](https://html2canvas.hertzen.com/).
- Supports **Light mode** and **Dark mode**.
- Clean, responsive layout that works on desktop and mobile.

## Live Demo

Click here: [https://vocabulary-flashcards.pages.dev](https://vocabulary-flashcards.pages.dev)

## Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
	- **[html2canvas](https://html2canvas.hertzen.com/)** – to export flashcards as images

## How It Works

1. Enter **word**, **pronunciation**, **parts of speech**, and **definition** in the input fields.
2. The flashcard **preview** updates in real-time.
3. Click **Download Flashcard** → The app captures the preview and saves it as a **PNG image**.

The image generation is powered by `html2canvas`, which takes a snapshot of the preview card and converts it to a downloadable image.