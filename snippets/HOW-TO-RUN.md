# How to run the snippets

This guide gets the workshop snippets running on your laptop. It works on Windows, macOS and Linux. Where the steps differ, each system has its own block, so use the one for your laptop.

There are two parts:

- **Vanilla JS snippets** (`snippets/vanilla/`): plain web pages. You only need a browser.
- **React snippets** (`snippets/react/`): a small app. You need Node.js installed.

---

## Step 1: Get the code

**Option A — with Git** (if you have Git installed):

```bash
git clone <repository-link>
```

Replace `<repository-link>` with the link your instructor shares. This creates a folder with the project inside.

**Option B — without Git:** on the repository's GitHub page, click the green **Code** button, then **Download ZIP**. Unzip it somewhere easy to find, like your Desktop.

Either way, you should now have a project folder that contains a `snippets` folder.

---

## Step 2: Open a terminal in the project folder

A terminal is the window where you type commands.

**Windows:** open the project folder in File Explorer. Click the address bar at the top, type `powershell`, and press Enter. A PowerShell window opens, already inside that folder.

**macOS:** open the **Terminal** app (press `Cmd + Space`, type `Terminal`, press Enter). Type `cd ` (with a space after it), drag the project folder from Finder into the Terminal window, and press Enter.

**Linux:** right-click inside the project folder in your file manager and choose **Open in Terminal**. If that option isn't there, open a terminal and use `cd` to move into the folder.

To check you're in the right place, run:

**Windows:**

```powershell
dir
```

**macOS / Linux:**

```bash
ls
```

You should see `snippets` in the list.

---

## Part 1: Vanilla JS snippets

Nothing to install. Open `snippets/vanilla/index.html` in your browser and follow the links on that page.

The easiest way is to find the file in your file manager and double-click it. Or open it from the terminal:

**Windows:**

```powershell
start snippets\vanilla\index.html
```

**macOS:**

```bash
open snippets/vanilla/index.html
```

**Linux:**

```bash
xdg-open snippets/vanilla/index.html
```

Each page has a yellow **Walkthrough** box: what to click, and what to notice.

---

## Part 2: React snippets

### 2.1 Install Node.js (one time only)

First check whether you already have it:

```bash
node --version
```

This command is the same on every system. You need **v20.19 or newer** (for example `v22.12.0` or `v24.1.0`). If it prints an older version, or an error like "command not found" or "not recognized", install Node.js:

**Windows and macOS:** go to [nodejs.org](https://nodejs.org), download the **LTS** installer, and run it with the default options. Then **close your terminal and open a new one** so it picks up the new install.

**Linux:** use [nvm](https://github.com/nvm-sh/nvm), which works on every distribution:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Close and reopen your terminal, then run:

```bash
nvm install --lts
```

Run `node --version` again to confirm it worked.

### 2.2 Install the snippet app's packages (one time only)

Move into the React snippets folder:

**Windows:**

```powershell
cd snippets\react
```

**macOS / Linux:**

```bash
cd snippets/react
```

Then install (same command on every system):

```bash
npm install
```

This downloads what the app needs into a `node_modules` folder. It can take a minute. Warnings in the output are normal. Only red lines that say `ERR!` mean something went wrong.

### 2.3 Start the snippets

Run this from inside `snippets/react` (same on every system):

```bash
npm run dev
```

After a few seconds you'll see something like:

```
  ➜  Local:   http://localhost:5173/
```

Open that address in your browser. Use whatever address your terminal shows, because the number at the end may be different on your laptop.

Pick an exercise from the sidebar on the left. Each one shows:

- the file its code lives in, if you want to read it,
- the **Walkthrough**: what to click, and what to notice,
- the running exercise.

You don't need to change any code. Just click through each exercise as it's explained.

### 2.4 Stop the snippets

Click on the terminal window and press `Ctrl + C`. This is the same on every system, including macOS.

### 2.5 Next time

You don't need to install anything again. Open a terminal in the project folder, then:

**Windows:**

```powershell
cd snippets\react
npm run dev
```

**macOS / Linux:**

```bash
cd snippets/react
npm run dev
```

---

## Opening the browser console

A few exercises (like **08b**) print messages to the browser console:

- **Windows / Linux:** press `F12` (or `Ctrl + Shift + I`), then click the **Console** tab.
- **macOS:** press `Cmd + Option + I`, then click the **Console** tab.

---

## If something goes wrong

**Windows: "running scripts is disabled on this system"** when you run `npm`.
This is a PowerShell safety setting. Run this once, answer `Y` if asked, then try again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Or use **Command Prompt** instead of PowerShell. In File Explorer's address bar, type `cmd` instead of `powershell`.

**"npm: command not found" / "'npm' is not recognized".**
Node.js isn't installed, or your terminal was opened before you installed it. Close the terminal, open a new one, and run `node --version` again.

**`npm run dev` says "Missing script: dev" or can't find `package.json`.**
You're in the wrong folder. You must be inside `snippets/react`. Run `dir` (Windows) or `ls` (macOS/Linux) and check that you can see `package.json`.

**Exercise 08a says "Could not load products. Is the server running?"**
That exercise needs the shop's backend running, which is a separate part of the workshop. Without it, this error message is the expected result. Your instructor will tell you if you need the backend for this session.

**Exercise 05b shows a red "This exercise crashed" box.**
That's expected. It shows what happens when a rule is broken. Click **Restart exercise** to bring it back.

**The page stops responding or shows "This site can't be reached".**
Check that the terminal running `npm run dev` is still open and hasn't stopped with an error. If it has, run `npm run dev` again and reload the page.
