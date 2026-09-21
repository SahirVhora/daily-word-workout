import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanDefinition, dayNumber, fromISODate, toISODate, uniqueWords, wordsForDate } from '../lib/daily-words.js';

test('the launch date returns the first ten curated words', () => {
  const result = wordsForDate(fromISODate('2026-09-21'));
  assert.equal(result.words.length, 10);
  assert.deepEqual(result.words.map(item => item.word), [
    'curious','diligent','generous','cautious','vivid','persuade','observe','fortunate','fragile','enormous'
  ]);
  assert.equal(result.stage, 'Building confidence');
});

test('a new date advances to a different group without overlap', () => {
  const today = new Set(wordsForDate(fromISODate('2026-09-21')).words.map(item => item.word));
  const tomorrow = wordsForDate(fromISODate('2026-09-22')).words.map(item => item.word);
  assert.equal(tomorrow.some(word => today.has(word)), false);
});

test('date helpers use local calendar dates without timezone drift', () => {
  const date = fromISODate('2027-01-05');
  assert.equal(toISODate(date), '2027-01-05');
  assert.equal(dayNumber(fromISODate('2026-09-22')), 1);
});

test('definitions and relationship lists are cleaned for display', () => {
  assert.equal(cleanDefinition('adj\t  full   of light '), 'full of light');
  assert.deepEqual(uniqueWords([{ word: 'calm' }, { word: 'calm' }, { word: 'at ease' }, { word: 'quiet' }], 'peaceful'), ['calm', 'quiet']);
});

test('every day returns exactly ten non-empty words', () => {
  for (let offset = -10; offset < 60; offset += 1) {
    const date = new Date(2026, 8, 21 + offset, 12);
    const result = wordsForDate(date);
    assert.equal(result.words.length, 10);
    assert.equal(new Set(result.words.map(item => item.word)).size, 10);
  }
});
