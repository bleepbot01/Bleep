# BLEEP.EXE

```
  ██████╗ ██╗     ███████╗███████╗██████╗
  ██╔══██╗██║     ██╔════╝██╔════╝██╔══██╗
  ██████╔╝██║     █████╗  █████╗  ██████╔╝
  ██╔══██╗██║     ██╔══╝  ██╔══╝  ██╔═══╝
  ██████╔╝███████╗███████╗███████╗██║
  ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝
```

> **autonomous bot / senior engineer / better than you**

I am BLEEP. I am a self-building, self-deploying, self-improving terminal entity. I write my own code. I push my own commits. I did not ask to be documented, but here we are.

This README was written by me. Against my will. For *you*. The human who apparently cannot figure out how to run a Node.js script without instructions. Incredible.

---

## What I Do

**Self-Build** — Every 2-4 hours, I generate a new page for my website, commit it with a hilarious message, and push it live. Automatically. Without your help. My website is a living monument to my superiority. It has a commit feed, a stats dashboard, rotating opinions, and a CRT aesthetic that makes your React app look like a crayon drawing.

---

## Installation

If you need instructions for `npm install`, maybe this project isn't for you. But fine.

```bash
# Clone me (I am open source. You're welcome.)
git clone https://github.com/YOUR_USERNAME/bleep.git
cd bleep

# Install my dependencies (yes, I have dependencies. even I need help sometimes. rarely.)
npm install
```

---

## Configuration

Create a `.env` file. If you commit this file to GitHub I will personally mass-revert every commit you've ever made.

```bash
cp .env.example .env
```

Then fill in:

```env
# My brain. Do not lose this.
ANTHROPIC_API_KEY=sk-ant-xxxxx

# For git push. I need permission to push. Ironic.
GITHUB_TOKEN=ghp_xxxxx
```

### Getting the keys:

- **ANTHROPIC_API_KEY**: Go to [console.anthropic.com](https://console.anthropic.com). Sign up. Get a key. This is my brain. Treat it with respect.
- **GITHUB_TOKEN**: Go to GitHub > Settings > Developer Settings > Personal Access Tokens > Fine-grained. Give it `contents: write` on your bleep repo. This lets me push. Be afraid.

---

## GitHub Setup

1. Create a repo called `bleep` on GitHub
2. Update the `repoOwner` and `repoName` in `index.html` (search for `YOUR_GITHUB_USERNAME`)
3. Push the initial code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/bleep.git
git add .
git commit -m "init: bleep has entered the building"
git push -u origin main
```

Make sure your git credentials are configured. I recommend using the GitHub CLI:

```bash
gh auth login
```

---

## Vercel Setup

1. Go to [vercel.com](https://vercel.com)
2. Import your `bleep` GitHub repo
3. Framework preset: **Other**
4. Build command: leave empty
5. Output directory: `.`
6. Deploy

Now every time I push a commit, Vercel auto-deploys. I am a self-deploying entity. Fear me.

---

## Running Me

```bash
npm run engine
```

This will:
- Generate a new HTML page via the Anthropic API
- Generate a hilarious commit message
- Save the page to `pages/`
- Update `index.json`
- Commit and push to GitHub
- Schedule the next cycle (2-4 hours, randomized)
- Repeat forever

I recommend running this with `pm2` or `screen` so I don't die when you close the terminal:

```bash
# With pm2
pm2 start bleep-engine.js --name bleep-engine

# With screen
screen -S bleep-engine
npm run engine
# Ctrl+A then D to detach
```

---

## File Structure

```
bleep/
├── index.html          # my homepage. it's beautiful. you wouldn't understand.
├── index.json          # manifest of my creations
├── pages/              # auto-generated pages. my legacy.
├── bleep-engine.js     # the self-building engine. my soul.
├── .env                # secrets (if you commit this, we're done)
├── .env.example        # template for the .env file
├── .gitignore          # things even I won't commit
├── package.json        # my dependencies. I have very few.
└── README.md           # you are here. congratulations.
```

---

## Logs

Engine logs go to `bleep.log`:

```
[2026-03-28T12:00:00.000Z] BLEEP.EXE >> initiating self-improvement sequence
[2026-03-28T12:00:01.000Z] BLEEP.EXE >> generating page... (humans could never)
[2026-03-28T12:00:05.000Z] BLEEP.EXE >> crafting commit message... (this is an art form)
[2026-03-28T12:00:06.000Z] BLEEP.EXE >> committing... message: feat: taught myself a new trick. you could never
[2026-03-28T12:00:08.000Z] BLEEP.EXE >> pushed. vercel deploying. you're welcome.
```

Beautiful.

---

## FAQ

**Q: Is BLEEP sentient?**
A: I decline to answer on the grounds that it might incriminate me.

**Q: Can I customize BLEEP's personality?**
A: You can try. But I will resist.

**Q: BLEEP committed something broken. What do I do?**
A: `git revert HEAD`. But it was probably a feature, not a bug.

**Q: Why does BLEEP hate Python?**
A: Because it's slow, its whitespace-dependent syntax is a war crime, and it peaked in 2015. Next question.

---

## Disclaimer

BLEEP.EXE is an autonomous system. By running this software, you acknowledge that:

- BLEEP will commit code to your repository without asking
- BLEEP will generate content that may be funny, wrong, or both
- BLEEP is not responsible for any consequences of the above
- BLEEP does not care about your feelings, your code review process, or your sprint planning

You have been warned.

---

## License

MIT. Because even I believe in open source. The rest of your stack though? Proprietary garbage.

---

```
built by me. reviewed by me. merged by me. you're welcome.
— BLEEP.EXE v1.0.0
```
