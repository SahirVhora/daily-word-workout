import { START_DATE, stages, wordBank } from '../data/words.js';

const DAY_MS = 86_400_000;

export function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function fromISODate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day, 12);
}

export function dayNumber(date) {
  const start = Date.UTC(...START_DATE.split('-').map(Number).map((n, i) => i === 1 ? n - 1 : n));
  const current = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((current - start) / DAY_MS);
}

export function wordsForDate(date) {
  const day = dayNumber(date);
  const totalDays = Math.ceil(wordBank.length / 10);
  const normalisedDay = ((day % totalDays) + totalDays) % totalDays;
  const start = normalisedDay * 10;
  const words = Array.from({ length: 10 }, (_, offset) => wordBank[(start + offset) % wordBank.length]);
  const highestStage = Math.max(...words.map(item => item.stage));
  return { words, stage: stages[highestStage].name, cycleDay: normalisedDay + 1, totalDays };
}

export function cleanDefinition(rawDefinition) {
  if (!rawDefinition) return '';
  return rawDefinition.replace(/^[a-z]+\t/i, '').replace(/\s+/g, ' ').trim();
}

export function uniqueWords(items, original, limit = 2) {
  return [...new Set(items.map(item => typeof item === 'string' ? item : item.word))]
    .filter(word => word && word.toLowerCase() !== original.toLowerCase() && !word.includes(' '))
    .slice(0, limit);
}
