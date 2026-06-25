// ─── State ──────────────────────────────────────────────────────────────────

const state = {
  scores: JSON.parse(localStorage.getItem('mindforge_scores') || '{}'),
  sessions: JSON.parse(localStorage.getItem('mindforge_sessions') || '[]'),
};

function saveState() {
  localStorage.setItem('mindforge_scores', JSON.stringify(state.scores));
  localStorage.setItem('mindforge_sessions', JSON.stringify(state.sessions));
}

function recordSession(game, score) {
  state.sessions.push({ game, score, ts: Date.now() });
  if (!state.scores[game] || score > state.scores[game]) {
    state.scores[game] = score;
  }
  saveState();
  updateHomeStats();
}

// ─── Navigation ─────────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(id);
  if (screen) {
    screen.classList.add('active');
    screen.style.animation = 'none';
    screen.offsetHeight;
    screen.style.animation = '';
  }
}

function showHome() {
  cleanupCurrentGame();
  showScreen('home');
  updateHomeStats();
}

function cleanupCurrentGame() {
  if (seq.timeout) clearTimeout(seq.timeout);
  if (nb.timeout) clearTimeout(nb.timeout);
  if (num.timeout) clearTimeout(num.timeout);
  if (vis.timeout) clearTimeout(vis.timeout);
  nb.running = false;
}

function updateHomeStats() {
  const totalSessions = state.sessions.length;
  document.getElementById('total-sessions').textContent = totalSessions;

  const allScores = state.sessions.map(s => s.score);
  const bestStreak = allScores.length ? Math.max(...allScores) : 0;
  document.getElementById('best-streak').textContent = bestStreak;

  const today = new Date().toDateString();
  const todaySessions = state.sessions.filter(s => new Date(s.ts).toDateString() === today);
  const todayMinutes = todaySessions.length * 1;
  document.getElementById('today-time').textContent = todayMinutes ? `${todayMinutes}m` : '0m';

  document.getElementById('best-sequence').textContent = state.scores.sequence || '—';
  document.getElementById('best-number').textContent = state.scores.number || '—';
  document.getElementById('best-visual').textContent = state.scores.visual || '—';
  document.getElementById('best-nback').textContent = state.scores.nback ? state.scores.nback + '%' : '—';
}

function showResults(game, score, detail, icon) {
  document.getElementById('results-icon').textContent = icon || '🎯';
  document.getElementById('results-value').textContent = score;
  document.getElementById('results-detail').textContent = detail || '';

  const isNewBest = !state.scores[game] || score > state.scores[game];
  document.getElementById('results-title').textContent = isNewBest ? 'New Best!' : 'Nice Work!';
  if (isNewBest) {
    document.getElementById('results-icon').textContent = '🏆';
  }

  const retryBtn = document.getElementById('results-retry');
  retryBtn.onclick = () => startGame(game);

  recordSession(game, score);
  showScreen('results-screen');
}

function startGame(game) {
  cleanupCurrentGame();
  switch (game) {
    case 'sequence': initSequence(); break;
    case 'number': initNumber(); break;
    case 'visual': initVisual(); break;
    case 'nback': initNBack(); break;
  }
}

// ─── Sequence Memory ────────────────────────────────────────────────────────

const seq = { pattern: [], showing: false, playerIndex: 0, level: 0, timeout: null };

function initSequence() {
  seq.pattern = [];
  seq.level = 0;
  seq.showing = false;
  seq.playerIndex = 0;

  const grid = document.getElementById('seq-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const tile = document.createElement('div');
    tile.className = 'seq-tile';
    tile.dataset.index = i;
    tile.addEventListener('click', () => seqTileClick(i));
    grid.appendChild(tile);
  }

  showScreen('sequence-screen');
  seqNextLevel();
}

function seqNextLevel() {
  seq.level++;
  document.getElementById('seq-level').textContent = seq.level;
  document.getElementById('seq-status').textContent = 'Watch the sequence';

  const next = Math.floor(Math.random() * 9);
  seq.pattern.push(next);
  seq.playerIndex = 0;
  seq.showing = true;

  seqPlayPattern();
}

function seqPlayPattern() {
  const tiles = document.querySelectorAll('.seq-tile');
  let i = 0;

  function lightNext() {
    if (i > 0) tiles[seq.pattern[i - 1]].classList.remove('lit');
    if (i >= seq.pattern.length) {
      seq.showing = false;
      document.getElementById('seq-status').textContent = 'Your turn';
      return;
    }
    tiles[seq.pattern[i]].classList.add('lit');
    i++;
    seq.timeout = setTimeout(lightNext, 600);
  }

  seq.timeout = setTimeout(lightNext, 400);
}

function seqTileClick(index) {
  if (seq.showing) return;

  const tiles = document.querySelectorAll('.seq-tile');

  if (index === seq.pattern[seq.playerIndex]) {
    tiles[index].classList.add('correct');
    setTimeout(() => tiles[index].classList.remove('correct'), 200);
    seq.playerIndex++;

    if (seq.playerIndex >= seq.pattern.length) {
      document.getElementById('seq-status').textContent = 'Correct!';
      seq.timeout = setTimeout(seqNextLevel, 800);
    }
  } else {
    tiles[index].classList.add('wrong');
    document.getElementById('seq-status').textContent = 'Wrong!';
    setTimeout(() => {
      showResults('sequence', seq.level - 1, `You remembered ${seq.level - 1} sequences`, '🧩');
    }, 1000);
  }
}

// ─── Number Memory ──────────────────────────────────────────────────────────

const num = { current: '', level: 0, timeout: null };

function initNumber() {
  num.level = 0;
  showScreen('number-screen');
  numNextLevel();
}

function numNextLevel() {
  num.level++;
  document.getElementById('num-level').textContent = num.level;

  let digits = '';
  for (let i = 0; i < num.level; i++) {
    digits += Math.floor(Math.random() * 10);
  }
  num.current = digits;

  const display = document.getElementById('num-display');
  display.textContent = digits;
  display.classList.remove('hidden');

  document.getElementById('num-input-area').classList.add('hidden');
  document.getElementById('num-result').classList.add('hidden');

  const showTime = 1000 + (num.level * 500);
  num.timeout = setTimeout(() => {
    display.classList.add('hidden');
    const inputArea = document.getElementById('num-input-area');
    inputArea.classList.remove('hidden');
    const input = document.getElementById('num-input');
    input.value = '';
    input.focus();
  }, showTime);
}

function checkNumber() {
  const input = document.getElementById('num-input');
  const guess = input.value.trim();

  document.getElementById('num-input-area').classList.add('hidden');

  const result = document.getElementById('num-result');
  result.classList.remove('hidden');

  if (guess === num.current) {
    result.innerHTML = `<div class="correct-answer">${num.current}</div><div class="expected">Correct!</div>`;
    num.timeout = setTimeout(numNextLevel, 1200);
  } else {
    result.innerHTML = `
      <div class="wrong-answer">${guess || '(empty)'}</div>
      <div class="expected">Correct answer: ${num.current}</div>
    `;
    setTimeout(() => {
      showResults('number', num.level - 1, `You remembered ${num.level - 1} digits`, '🔢');
    }, 1500);
  }
}

document.getElementById('num-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkNumber();
});

// ─── Visual Memory ──────────────────────────────────────────────────────────

const vis = { targets: new Set(), picked: new Set(), gridSize: 3, numTargets: 3, level: 0, lives: 3, canPick: false, timeout: null };

function initVisual() {
  vis.level = 0;
  vis.lives = 3;
  vis.gridSize = 3;
  vis.numTargets = 3;
  showScreen('visual-screen');
  visNextLevel();
}

function visNextLevel() {
  vis.level++;
  vis.canPick = false;
  vis.targets.clear();
  vis.picked.clear();

  if (vis.level <= 3) {
    vis.gridSize = 3;
    vis.numTargets = vis.level + 2;
  } else if (vis.level <= 6) {
    vis.gridSize = 4;
    vis.numTargets = vis.level + 2;
  } else {
    vis.gridSize = 5;
    vis.numTargets = Math.min(vis.level + 2, 15);
  }

  document.getElementById('vis-level').textContent = vis.level;
  document.getElementById('vis-status').textContent = `Memorize ${vis.numTargets} tiles (${vis.lives} lives)`;

  const grid = document.getElementById('vis-grid');
  const totalTiles = vis.gridSize * vis.gridSize;
  grid.style.gridTemplateColumns = `repeat(${vis.gridSize}, 1fr)`;
  grid.innerHTML = '';

  while (vis.targets.size < vis.numTargets) {
    vis.targets.add(Math.floor(Math.random() * totalTiles));
  }

  for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement('div');
    tile.className = 'vis-tile';
    tile.dataset.index = i;
    if (vis.targets.has(i)) tile.classList.add('show');
    tile.addEventListener('click', () => visTileClick(i, tile));
    grid.appendChild(tile);
  }

  const showTime = 1200 + (vis.numTargets * 200);
  vis.timeout = setTimeout(() => {
    document.querySelectorAll('.vis-tile.show').forEach(t => t.classList.remove('show'));
    vis.canPick = true;
    document.getElementById('vis-status').textContent = 'Select the tiles';
  }, showTime);
}

function visTileClick(index, tile) {
  if (!vis.canPick || vis.picked.has(index)) return;
  vis.picked.add(index);

  if (vis.targets.has(index)) {
    tile.classList.add('picked-correct');
    if (vis.picked.size === vis.targets.size) {
      vis.canPick = false;
      document.getElementById('vis-status').textContent = 'Perfect!';
      vis.timeout = setTimeout(visNextLevel, 800);
    }
  } else {
    tile.classList.add('picked-wrong');
    vis.lives--;
    document.getElementById('vis-status').textContent = `Wrong! ${vis.lives} lives left`;

    if (vis.lives <= 0) {
      vis.canPick = false;
      document.querySelectorAll('.vis-tile').forEach(t => {
        const idx = parseInt(t.dataset.index);
        if (vis.targets.has(idx) && !vis.picked.has(idx)) {
          t.classList.add('missed');
        }
      });
      setTimeout(() => {
        showResults('visual', vis.level - 1, `Reached level ${vis.level - 1}`, '👁️');
      }, 1200);
    }
  }
}

// ─── N-Back ─────────────────────────────────────────────────────────────────

const nb = {
  n: 2,
  sequence: [],
  current: 0,
  totalRounds: 20,
  responses: [],
  responded: false,
  running: false,
  correct: 0,
  total: 0,
  timeout: null,
};

function initNBack() {
  nb.n = 2;
  nb.current = 0;
  nb.sequence = [];
  nb.responses = [];
  nb.correct = 0;
  nb.total = 0;
  nb.running = true;
  nb.responded = false;

  for (let i = 0; i < nb.totalRounds; i++) {
    if (i < nb.n) {
      nb.sequence.push(Math.floor(Math.random() * 9));
    } else {
      const isMatch = Math.random() < 0.35;
      if (isMatch) {
        nb.sequence.push(nb.sequence[i - nb.n]);
      } else {
        let pos;
        do { pos = Math.floor(Math.random() * 9); } while (pos === nb.sequence[i - nb.n]);
        nb.sequence.push(pos);
      }
    }
  }

  document.getElementById('nb-n').textContent = nb.n;
  document.getElementById('nb-total').textContent = nb.totalRounds;
  document.getElementById('nb-accuracy').textContent = '—';

  const grid = document.getElementById('nb-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'nb-cell';
    grid.appendChild(cell);
  }

  showScreen('nback-screen');
  nb.timeout = setTimeout(() => nbShowNext(), 500);
}

function nbShowNext() {
  if (!nb.running) return;

  if (nb.current > 0 && !nb.responded && nb.current > nb.n) {
    const wasMatch = nb.sequence[nb.current - 1] === nb.sequence[nb.current - 1 - nb.n];
    if (!wasMatch) {
      nb.correct++;
    }
    nb.total++;
  }

  if (nb.current >= nb.totalRounds) {
    nbFinish();
    return;
  }

  const cells = document.querySelectorAll('.nb-cell');
  cells.forEach(c => c.classList.remove('active'));

  const pos = nb.sequence[nb.current];
  cells[pos].classList.add('active');

  document.getElementById('nb-round').textContent = nb.current + 1;
  nb.responded = false;

  document.getElementById('nb-match-btn').disabled = false;
  document.getElementById('nb-skip-btn').disabled = false;

  nb.current++;
  nb.timeout = setTimeout(() => {
    cells[pos].classList.remove('active');
    nb.timeout = setTimeout(nbShowNext, 400);
  }, 2000);
}

function nbackResponse(isMatch) {
  if (!nb.running || nb.responded) return;
  if (nb.current <= nb.n) return;

  nb.responded = true;
  document.getElementById('nb-match-btn').disabled = true;
  document.getElementById('nb-skip-btn').disabled = true;

  const actual = nb.sequence[nb.current - 1] === nb.sequence[nb.current - 1 - nb.n];
  if (isMatch === actual) {
    nb.correct++;
  }
  nb.total++;

  const pct = nb.total > 0 ? Math.round((nb.correct / nb.total) * 100) : 0;
  document.getElementById('nb-accuracy').textContent = pct + '%';
}

function nbFinish() {
  nb.running = false;
  const pct = nb.total > 0 ? Math.round((nb.correct / nb.total) * 100) : 0;
  showResults('nback', pct, `${nb.correct}/${nb.total} correct at ${nb.n}-back`, '🧠');
}

// ─── Init ───────────────────────────────────────────────────────────────────

updateHomeStats();
