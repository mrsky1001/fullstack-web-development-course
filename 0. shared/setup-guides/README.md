# Development Environment Setup Guide

> 🌐 [Русская версия](./README.ru.md) | 📚 [Git & GitHub Manual](./GIT-GITHUB-MANUAL.md)

This guide will help you set up your development environment for the full-stack web development course.

## 📋 Table of Contents

1. [Code Editor Setup](#code-editor-setup)
2. [Node.js and npm](#nodejs-and-npm)
3. [MySQL Database](#mysql-database)
4. [Git Version Control](#git-version-control)
5. [Browser and DevTools](#browser-and-devtools)
6. [Optional Tools](#optional-tools)

> 💡 **Tip:** For a comprehensive Git tutorial, see [Git & GitHub Manual](./GIT-GITHUB-MANUAL.md)

---

## 1. Code Editor Setup

### Visual Studio Code (Recommended)

**Download and Install:**
- Visit [code.visualstudio.com](https://code.visualstudio.com/)
- Download for your operating system
- Run the installer

**Recommended Extensions:**

Install these extensions for better development experience:

```
1. Live Server - Launch a local development server
2. Prettier - Code formatter
3. ESLint - JavaScript linter
4. Auto Rename Tag - Automatically rename paired HTML tags
5. Path Intellisense - Autocomplete filenames
6. GitLens - Enhanced Git integration
7. MySQL - Database management
8. Thunder Client - API testing (alternative to Postman)
```

**How to Install Extensions:**
1. Open VS Code
2. Click Extensions icon (Ctrl+Shift+X)
3. Search for extension name
4. Click "Install"

**Recommended Settings:**

Create or edit `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "files.autoSave": "afterDelay",
  "liveServer.settings.donotShowInfoMsg": true
}
```

---

## 2. Node.js and npm

### Installation

**Windows:**
1. Visit [nodejs.org](https://nodejs.org/)
2. Download LTS (Long Term Support) version
3. Run installer with default settings
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

**macOS:**
```bash
# Using Homebrew
brew install node

# Verify
node --version
npm --version
```

**Linux (Ubuntu/Debian):**
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### npm Configuration

**Set npm defaults:**
```bash
npm config set init-author-name "Your Name"
npm config set init-license "MIT"
```

**Global packages to install:**
```bash
npm install -g nodemon    # Auto-restart Node.js apps
npm install -g npm-check  # Check for outdated packages
```

---

## 3. MySQL Database

### Installation

**Windows:**
1. Visit [dev.mysql.com/downloads/installer](https://dev.mysql.com/downloads/installer/)
2. Download MySQL Installer
3. Choose "Developer Default" setup type
4. Set root password (remember this!)
5. Complete installation

**macOS:**
```bash
# Using Homebrew
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql

# Secure installation
sudo mysql_secure_installation
```

### MySQL Workbench

**Install MySQL Workbench:**
- Download from [dev.mysql.com/downloads/workbench](https://dev.mysql.com/downloads/workbench/)
- Install with default settings

**Create a Connection:**
1. Open MySQL Workbench
2. Click "+" to add new connection
3. Connection name: "Local Development"
4. Hostname: `127.0.0.1`
5. Port: `3306`
6. Username: `root`
7. Test connection

### Verify MySQL Installation

```bash
# Connect to MySQL
mysql -u root -p

# Inside MySQL shell
SHOW DATABASES;
SELECT VERSION();
EXIT;
```

---

## 4. Git Version Control

### Installation

**Windows:**
1. Visit [git-scm.com](https://git-scm.com/)
2. Download Git for Windows
3. Run installer (use default settings)

**macOS:**
```bash
# Using Homebrew
brew install git
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install git
```

### Configuration

**Set your identity:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Set default branch name:**
```bash
git config --global init.defaultBranch basic
```

**Set default editor:**
```bash
git config --global core.editor "code --wait"
```

**Verify configuration:**
```bash
git config --list
```

### GitHub Account (Optional)

1. Create account at [github.com](https://github.com/)
2. Set up SSH key (optional but recommended)

---

## 5. Browser and DevTools

### Recommended Browsers

**Primary:**
- **Google Chrome** - [google.com/chrome](https://www.google.com/chrome/)
- **Mozilla Firefox** - [mozilla.org/firefox](https://www.mozilla.org/firefox/)

**Testing:**
- Microsoft Edge (comes with Windows)
- Safari (macOS only)

### Chrome DevTools

**Access DevTools:**
- Windows/Linux: `F12` or `Ctrl+Shift+I`
- macOS: `Cmd+Option+I`

**Key Panels:**
- **Elements** - Inspect and modify HTML/CSS
- **Console** - JavaScript debugging
- **Network** - Monitor requests
- **Application** - Storage, cookies, cache
- **Sources** - Debug JavaScript

**Useful Extensions:**
- React Developer Tools
- Vue.js devtools
- JSON Formatter

---

## 6. Optional Tools

### Postman (API Testing)
- Download: [postman.com](https://www.postman.com/)
- Alternative: Thunder Client (VS Code extension)

### Terminal Enhancements

**Windows:**
- Windows Terminal (from Microsoft Store)
- Git Bash (included with Git)

**macOS/Linux:**
- iTerm2 (macOS)
- Oh My Zsh (shell enhancement)

### Design Tools

- **Figma** - UI/UX design (web-based)
- **Draw.io** - Diagrams and flowcharts

---

## ✅ Verification Checklist

After setup, verify everything works:

```bash
# Check Node.js
node --version
# Expected: v18.x.x or higher

# Check npm
npm --version
# Expected: 9.x.x or higher

# Check Git
git --version
# Expected: 2.x.x or higher

# Check MySQL
mysql --version
# Expected: 8.x.x or higher
```

---

## 🆘 Troubleshooting

### Node.js not found
- Restart terminal/computer after installation
- Check PATH environment variable

### MySQL connection refused
- Ensure MySQL service is running
- Check port 3306 is not blocked

### Git commands not working
- Restart terminal after installation
- Verify Git is in PATH

### VS Code extensions not working
- Reload VS Code window
- Check extension compatibility

---

## 📚 Additional Resources

- [VS Code Documentation](https://code.visualstudio.com/docs)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Git Documentation](https://git-scm.com/doc)

---

**Next Steps:**
After completing this setup, you're ready to start the course! Begin with `frontend/01-course-introduction/`.
