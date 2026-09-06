/**
 * Converts lesson .ts files to .md content files.
 * Run: node --loader ts-node/esm scripts/convert-lessons.ts
 * Or just use it as reference — the .md files were created manually.
 */

// This script was used to generate the initial .md lesson files.
// Going forward, edit the .md files directly in content/lessons/.
//
// Structure:
//   content/lessons/
//   ├── 01-intro/
//   │   ├── _lesson.yml          # { id: 1, title: "..." }
//   │   ├── 01-what-is-website.md
//   │   ├── 02-project-structure.md
//   │   └── 03-palette.md
//   ├── 02-markup/
//   │   ├── _lesson.yml
//   │   ├── 01-semantic-tags.md
//   │   └── ...
//   └── ...
//
// Each .md file format:
//   ---
//   title: "Step title"
//   highlight: html  # optional: html | css | js
//   ---
//
//   # Markdown explanation...
//
//   ```html:start
//   <p>Starting HTML code</p>
//   ```
//
//   ```css:start
//   body { color: red; }
//   ```
//
//   ```js:start
//   console.log('hello');
//   ```
//
//   ```html:solution
//   <p>Solution HTML code</p>
//   ```
//
//   ```css:solution
//   body { color: blue; }
//   ```
//
//   ```js:solution
//   console.log('done!');
//   ```

console.log('See content/lessons/ for the .md format. Edit files there directly.');
