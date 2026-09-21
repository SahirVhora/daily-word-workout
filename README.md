# Daily Word Workout

A calm, child-friendly vocabulary app for ages 9-11. It presents ten new words per calendar day, gradually moves through three difficulty stages, remembers learned words on the device, and formats the activity as an A4 worksheet.

## Run it

```bash
npm start
```

Open <http://127.0.0.1:4321>. No account or API key is required.

Choose one of the two worksheet versions:

- **Practice** leaves the meaning, synonym and antonym spaces blank.
- **Answer sheet** displays the matching meanings, synonyms and antonyms for checking afterwards.

Use **Print Practice PDF** or **Print Answer PDF**, then choose **Save as PDF** in the browser print window. Printing on A4 at the browser's default scale is recommended.

## How daily words work

- The word bank is curated locally so an unsuitable random word cannot appear.
- The date determines the group of ten, so every device gets the same worksheet for a given date.
- The sequence moves from **Building confidence** to **Stretching further** and then **Word master**.
- Meanings and relationships are refreshed from the [Datamuse API](https://www.datamuse.com/api/) when online and cached by the browser. The first three days have complete hand-checked offline details; later unavailable entries become guided look-up prompts rather than guessed definitions.
- Datamuse has announced that API keys will be required from 1 January 2027. The app will continue to work in guided offline mode, but live refresh will require adding a key or replacing the provider before then.

You can preview a date directly with `?date=YYYY-MM-DD`, for example:

<http://127.0.0.1:4321/?date=2026-09-21>

Add `&version=answers` to open the answer sheet directly.

## Check it

```bash
npm test
npm run test:e2e
```

The first command checks date selection and content rules. The second checks the full page on desktop and mobile. End-to-end tests reuse Playwright installed in the parent `education` workspace.

## Privacy

No name, login, or personal information is collected. Learned-word ticks are kept only in the browser's local storage.
