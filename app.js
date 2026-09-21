import { fallbackDetails } from './data/words.js';
import { cleanDefinition, fromISODate, toISODate, uniqueWords, wordsForDate } from './lib/daily-words.js';

const elements = {
  date: document.querySelector('#display-date'),
  list: document.querySelector('#word-list'),
  template: document.querySelector('#word-card-template'),
  previous: document.querySelector('#previous-day'),
  next: document.querySelector('#next-day'),
  today: document.querySelector('#today-button'),
  print: document.querySelector('#print-button'),
  printLabel: document.querySelector('#print-button-label'),
  practiceMode: document.querySelector('#practice-mode'),
  answerMode: document.querySelector('#answer-mode'),
  modeHelp: document.querySelector('#worksheet-mode-help'),
  versionLabel: document.querySelector('#worksheet-version-label'),
  progressCount: document.querySelector('#progress-count'),
  progressBar: document.querySelector('#progress-bar'),
  sourceStatus: document.querySelector('#source-status'),
  levelBadge: document.querySelector('#level-badge')
};

let selectedDate = new Date();
let renderToken = 0;
let worksheetMode = 'practice';

function storageKey(date) {
  return `daily-word-workout:${toISODate(date)}`;
}

function readProgress(date) {
  try { return new Set(JSON.parse(localStorage.getItem(storageKey(date)) || '[]')); }
  catch { return new Set(); }
}

function saveProgress(date, progress) {
  try { localStorage.setItem(storageKey(date), JSON.stringify([...progress])); }
  catch { /* The worksheet still works when storage is blocked. */ }
}

function updateProgress(progress) {
  const count = progress.size;
  elements.progressCount.textContent = `${count} of 10`;
  elements.progressBar.style.width = `${count * 10}%`;
}

function fallbackFor(word) {
  return fallbackDetails[word] || {
    part: 'word',
    meaning: 'Look this word up together, then write a short meaning here.',
    synonyms: ['find one'],
    antonyms: ['find one']
  };
}

async function fetchJSON(url, timeout = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Dictionary returned ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchDetails(word) {
  if (fallbackDetails[word]) return fallbackDetails[word];
  const cacheKey = `daily-word-details:v1:${word}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch { /* Continue with a live lookup when storage is blocked. */ }

  const encoded = encodeURIComponent(word);
  const [definitionResult, synonymResult, antonymResult] = await Promise.all([
    fetchJSON(`https://api.datamuse.com/words?sp=${encoded}&md=dp&max=1`),
    fetchJSON(`https://api.datamuse.com/words?rel_syn=${encoded}&max=5`),
    fetchJSON(`https://api.datamuse.com/words?rel_ant=${encoded}&max=5`)
  ]);
  const entry = definitionResult[0] || {};
  const tag = (entry.tags || []).find(value => ['n', 'v', 'adj', 'adv'].includes(value));
  const parts = { n: 'noun', v: 'verb', adj: 'adjective', adv: 'adverb' };
  const fallback = fallbackFor(word);
  const details = {
    part: parts[tag] || fallback.part,
    meaning: cleanDefinition(entry.defs?.[0]) || fallback.meaning,
    synonyms: uniqueWords(synonymResult, word).length ? uniqueWords(synonymResult, word) : fallback.synonyms,
    antonyms: uniqueWords(antonymResult, word).length ? uniqueWords(antonymResult, word) : fallback.antonyms
  };
  try { localStorage.setItem(cacheKey, JSON.stringify(details)); }
  catch { /* Caching is optional. */ }
  return details;
}

function speak(word) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-GB';
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

function createCard(item, index, details, progress) {
  const card = elements.template.content.firstElementChild.cloneNode(true);
  card.querySelector('.word-number').textContent = String(index + 1).padStart(2, '0');
  card.querySelector('.word').textContent = item.word;
  card.querySelector('.part-of-speech').textContent = details.part;
  const meaning = card.querySelector('.meaning');
  const synonyms = card.querySelector('.synonyms');
  const antonyms = card.querySelector('.antonyms');
  if (worksheetMode === 'practice') {
    meaning.classList.add('blank-meaning');
    meaning.append(document.createElement('i'), document.createElement('i'));
    synonyms.classList.add('blank-answer');
    antonyms.classList.add('blank-answer');
    meaning.setAttribute('aria-label', 'Blank space for the meaning');
    synonyms.setAttribute('aria-label', 'Blank space for a synonym');
    antonyms.setAttribute('aria-label', 'Blank space for an antonym');
  } else {
    meaning.textContent = details.meaning;
    synonyms.textContent = details.synonyms.join(' · ');
    antonyms.textContent = details.antonyms.join(' · ');
  }
  const speakButton = card.querySelector('.speak-button');
  speakButton.setAttribute('aria-label', `Hear ${item.word}`);
  speakButton.addEventListener('click', () => speak(item.word));
  const checkbox = card.querySelector('input');
  checkbox.checked = progress.has(item.word);
  checkbox.addEventListener('change', () => {
    checkbox.checked ? progress.add(item.word) : progress.delete(item.word);
    saveProgress(selectedDate, progress);
    updateProgress(progress);
  });
  return card;
}

function updateModeControls() {
  const isPractice = worksheetMode === 'practice';
  document.body.dataset.worksheetMode = worksheetMode;
  elements.practiceMode.setAttribute('aria-pressed', String(isPractice));
  elements.answerMode.setAttribute('aria-pressed', String(!isPractice));
  elements.versionLabel.textContent = isPractice ? 'Practice worksheet' : 'Answer sheet';
  elements.printLabel.textContent = isPractice ? 'Print Practice PDF' : 'Print Answer PDF';
  elements.modeHelp.textContent = isPractice
    ? 'Meanings, synonyms and antonyms are blank so your child can attempt them first.'
    : 'Use this version to check the meanings, synonyms and antonyms together.';
}

function setWorksheetMode(mode) {
  if (!['practice', 'answers'].includes(mode) || worksheetMode === mode) return;
  worksheetMode = mode;
  updateModeControls();
  render();
}

async function render() {
  const token = ++renderToken;
  const { words, stage, cycleDay, totalDays } = wordsForDate(selectedDate);
  const progress = readProgress(selectedDate);
  elements.date.dateTime = toISODate(selectedDate);
  elements.date.textContent = selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  elements.levelBadge.textContent = stage;
  elements.levelBadge.dataset.level = stage;
  elements.list.replaceChildren();
  elements.list.setAttribute('aria-busy', 'true');
  elements.sourceStatus.textContent = `Day ${cycleDay} of ${totalDays} · Checking the live dictionary…`;
  updateProgress(progress);

  const results = await Promise.all(words.map(async item => {
    try { return { details: await fetchDetails(item.word), live: true }; }
    catch { return { details: fallbackFor(item.word), live: false }; }
  }));
  if (token !== renderToken) return;

  const fragment = document.createDocumentFragment();
  words.forEach((item, index) => fragment.append(createCard(item, index, results[index].details, progress)));
  elements.list.append(fragment);
  elements.list.setAttribute('aria-busy', 'false');
  const readyCount = results.filter(result => result.live).length;
  elements.sourceStatus.textContent = readyCount === 10
    ? `Day ${cycleDay} of ${totalDays} · Word details ready`
    : `Day ${cycleDay} of ${totalDays} · Guided offline mode (${readyCount}/10 ready)`;
}

function changeDay(offset) {
  selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + offset, 12);
  render();
}

elements.previous.addEventListener('click', () => changeDay(-1));
elements.next.addEventListener('click', () => changeDay(1));
elements.today.addEventListener('click', () => { selectedDate = new Date(); render(); });
elements.print.addEventListener('click', () => window.print());
elements.practiceMode.addEventListener('click', () => setWorksheetMode('practice'));
elements.answerMode.addEventListener('click', () => setWorksheetMode('answers'));

const query = new URLSearchParams(location.search);
const queryDate = query.get('date');
if (/^\d{4}-\d{2}-\d{2}$/.test(queryDate || '')) selectedDate = fromISODate(queryDate);
if (query.get('version') === 'answers') worksheetMode = 'answers';
updateModeControls();
render();
