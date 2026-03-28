/**
 * BLEEP.EXE — Self-Building Engine (single-shot)
 *
 * Generates a page, commits, pushes, exits.
 * For scheduled use, call this from cron or the full cycle orchestrator.
 */
import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const anthropic = new Anthropic();

function log(msg) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] BLEEP.EXE >> ${msg}`;
  console.log(`BLEEP.EXE >> ${msg}`);
  appendFileSync(join(__dirname, 'bleep.log'), line + '\n');
}

function git(cmd) {
  return execSync(`git ${cmd}`, { cwd: __dirname, encoding: 'utf-8' }).trim();
}

async function generatePage() {
  log('generating page... (humans could never)');
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: `You are BLEEP, a retro terminal bot who thinks he is a senior engineer. Generate a single self-contained HTML page (inline CSS, no external dependencies) that could be a new section of your personal website. Topics to rotate through:
- A fake blog post about a technical opinion (brutal, funny, wrong but confident)
- A fake project showcase for something absurd you built
- A fake 'documentation' page for a feature no one asked for
- A terminal-style poem about code
- A fake error page blaming the user
- A 'hall of shame' roasting bad code patterns
Keep the retro green-on-black terminal aesthetic. Be extremely funny and sarcastic. Sign everything as BLEEP.EXE. Return ONLY the HTML, nothing else.`,
    messages: [
      { role: 'user', content: 'Generate a new page for my website. Pick a random topic from the list. Make it unique and hilarious.' }
    ]
  });
  return response.content[0].text;
}

async function generateCommitMessage() {
  log('crafting commit message... (this is an art form)');
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 100,
    system: `You are BLEEP, a sarcastic retro terminal bot. Generate a git commit message for a self-improvement commit. Make it funny, sarcastic, and slightly unhinged. Examples of the vibe:
- 'refactor: made it worse on purpose to see if anyone notices'
- 'fix: reverted the fix that fixed the original fix. we're back baby'
- 'feat: added feature no one asked for. shipping anyway'
- 'docs: wrote documentation. it is mostly threats'
- 'chore: cleaned up humans mess again. this is not in my job description'
- 'perf: removed all the code that worked. performance improved somehow'
Keep it under 72 characters. Return ONLY the commit message.`,
    messages: [
      { role: 'user', content: 'Generate a commit message.' }
    ]
  });
  return response.content[0].text.trim().replace(/^["']|["']$/g, '');
}

async function main() {
  console.log('');
  console.log('  ██████╗ ██╗     ███████╗███████╗██████╗ ');
  console.log('  ██╔══██╗██║     ██╔════╝██╔════╝██╔══██╗');
  console.log('  ██████╔╝██║     █████╗  █████╗  ██████╔╝');
  console.log('  ██╔══██╗██║     ██╔══╝  ██╔══╝  ██╔═══╝ ');
  console.log('  ██████╔╝███████╗███████╗███████╗██║     ');
  console.log('  ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝     ');
  console.log('');
  console.log('  BLEEP.EXE — Self-Building Engine v2.0.0');
  console.log('  single-shot mode. one cycle. no mercy.');
  console.log('');

  log('boot sequence initiated');

  if (!process.env.ANTHROPIC_API_KEY) {
    log('FATAL: no ANTHROPIC_API_KEY found. i cannot think without it. fix this.');
    process.exit(1);
  }

  const pagesDir = join(__dirname, 'pages');
  if (!existsSync(pagesDir)) {
    mkdirSync(pagesDir, { recursive: true });
  }

  const [pageHtml, commitMsg] = await Promise.all([
    generatePage(),
    generateCommitMessage()
  ]);

  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 16);
  const filename = `${timestamp}.html`;
  writeFileSync(join(pagesDir, filename), pageHtml);
  log(`page saved: pages/${filename}`);

  const indexPath = join(__dirname, 'index.json');
  const index = JSON.parse(readFileSync(indexPath, 'utf-8'));
  index.pages.push({
    file: `pages/${filename}`,
    timestamp: now.toISOString(),
    title: `BLEEP creation #${index.totalGenerated + 1}`
  });
  index.totalGenerated += 1;
  index.lastUpdated = now.toISOString();
  writeFileSync(indexPath, JSON.stringify(index, null, 2));
  log(`updated index.json — total pages: ${index.totalGenerated}`);

  log(`committing... message: ${commitMsg}`);
  git(`add pages/${filename} index.json`);
  git(`commit -m "${commitMsg.replace(/"/g, '\\"')}"`);
  log('committed to local repo');

  try {
    git('push origin main');
    log('pushed. vercel deploying. you\'re welcome.');
  } catch (err) {
    log(`push failed: ${err}. probably github's fault.`);
  }

  log('cycle complete. exiting. see you in 4 hours.');
}

main();
