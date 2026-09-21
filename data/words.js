export const START_DATE = '2026-09-21';

export const fallbackDetails = {
  curious: { part: 'adjective', meaning: 'Eager to know or learn something.', synonyms: ['interested', 'inquisitive'], antonyms: ['uninterested', 'indifferent'] },
  diligent: { part: 'adjective', meaning: 'Showing steady, careful effort in your work.', synonyms: ['hard-working', 'careful'], antonyms: ['lazy', 'careless'] },
  generous: { part: 'adjective', meaning: 'Willing to give or share more than is expected.', synonyms: ['giving', 'kind'], antonyms: ['selfish', 'stingy'] },
  cautious: { part: 'adjective', meaning: 'Careful to avoid danger or mistakes.', synonyms: ['careful', 'watchful'], antonyms: ['reckless', 'careless'] },
  vivid: { part: 'adjective', meaning: 'Producing strong, clear pictures in the mind.', synonyms: ['bright', 'striking'], antonyms: ['dull', 'faint'] },
  persuade: { part: 'verb', meaning: 'To convince someone to do or believe something.', synonyms: ['convince', 'influence'], antonyms: ['discourage', 'dissuade'] },
  observe: { part: 'verb', meaning: 'To watch or notice something carefully.', synonyms: ['notice', 'watch'], antonyms: ['ignore', 'overlook'] },
  fortunate: { part: 'adjective', meaning: 'Having good luck or a favourable result.', synonyms: ['lucky', 'favoured'], antonyms: ['unlucky', 'unfortunate'] },
  fragile: { part: 'adjective', meaning: 'Easily broken, damaged or harmed.', synonyms: ['delicate', 'breakable'], antonyms: ['strong', 'sturdy'] },
  enormous: { part: 'adjective', meaning: 'Extremely large in size or amount.', synonyms: ['huge', 'immense'], antonyms: ['tiny', 'minute'] },
  admire: { part: 'verb', meaning: 'To respect or approve of someone or something.', synonyms: ['respect', 'appreciate'], antonyms: ['dislike', 'scorn'] },
  ancient: { part: 'adjective', meaning: 'Belonging to a time very long ago.', synonyms: ['old', 'historic'], antonyms: ['modern', 'recent'] },
  anxious: { part: 'adjective', meaning: 'Worried or uneasy about what may happen.', synonyms: ['worried', 'uneasy'], antonyms: ['calm', 'relaxed'] },
  arrive: { part: 'verb', meaning: 'To reach a place at the end of a journey.', synonyms: ['reach', 'appear'], antonyms: ['depart', 'leave'] },
  cheerful: { part: 'adjective', meaning: 'Noticeably happy and positive.', synonyms: ['happy', 'bright'], antonyms: ['gloomy', 'miserable'] },
  combine: { part: 'verb', meaning: 'To join things together to make one whole.', synonyms: ['join', 'unite'], antonyms: ['separate', 'divide'] },
  conceal: { part: 'verb', meaning: 'To keep something hidden from view.', synonyms: ['hide', 'cover'], antonyms: ['reveal', 'expose'] },
  depart: { part: 'verb', meaning: 'To leave a place, especially on a journey.', synonyms: ['leave', 'exit'], antonyms: ['arrive', 'remain'] },
  eager: { part: 'adjective', meaning: 'Very keen and excited to do something.', synonyms: ['keen', 'enthusiastic'], antonyms: ['reluctant', 'unwilling'] },
  frequent: { part: 'adjective', meaning: 'Happening often or many times.', synonyms: ['regular', 'common'], antonyms: ['rare', 'occasional'] },
  gloomy: { part: 'adjective', meaning: 'Dark, poorly lit, or feeling sad.', synonyms: ['dim', 'miserable'], antonyms: ['bright', 'cheerful'] },
  genuine: { part: 'adjective', meaning: 'Real, honest and exactly what it appears to be.', synonyms: ['authentic', 'sincere'], antonyms: ['fake', 'false'] },
  humble: { part: 'adjective', meaning: 'Not believing that you are better than others.', synonyms: ['modest', 'unassuming'], antonyms: ['proud', 'arrogant'] },
  scarce: { part: 'adjective', meaning: 'Hard to find because there is very little available.', synonyms: ['rare', 'limited'], antonyms: ['plentiful', 'abundant'] },
  swift: { part: 'adjective', meaning: 'Moving or happening very quickly.', synonyms: ['quick', 'rapid'], antonyms: ['slow', 'sluggish'] },
  timid: { part: 'adjective', meaning: 'Shy, nervous or lacking courage.', synonyms: ['shy', 'fearful'], antonyms: ['bold', 'brave'] },
  vanish: { part: 'verb', meaning: 'To disappear suddenly or completely.', synonyms: ['disappear', 'fade'], antonyms: ['appear', 'emerge'] },
  weary: { part: 'adjective', meaning: 'Very tired after effort or worry.', synonyms: ['tired', 'exhausted'], antonyms: ['rested', 'energetic'] },
  wisdom: { part: 'noun', meaning: 'The ability to use knowledge and experience sensibly.', synonyms: ['judgement', 'insight'], antonyms: ['foolishness', 'ignorance'] },
  ordinary: { part: 'adjective', meaning: 'Normal and not unusual or special.', synonyms: ['usual', 'common'], antonyms: ['unusual', 'extraordinary'] }
};

const confidence = [
  'curious','diligent','generous','cautious','vivid','persuade','observe','fortunate','fragile','enormous',
  'admire','ancient','anxious','arrive','cheerful','combine','conceal','depart','eager','frequent',
  'gloomy','genuine','humble','scarce','swift','timid','vanish','weary','wisdom','ordinary',
  'abundant','accurate','awkward','brief','calm','capture','clever','clumsy','cooperate','courage',
  'cruel','delicate','despair','distant','elegant','expand','fierce','flexible','gather','grateful',
  'harmful','honest','imitate','include','innocent','loyal','mischief','narrow','patient','peaceful',
  'precious','protect','rapid','rare','refuse','remarkable','rescue','rough','separate','shallow',
  'silent','simple','sturdy','sudden','talent','tender','triumph','vacant','valuable','visible',
  'whisper','willing','amuse','assist','avoid','brilliant','certain','compare','complete','confuse',
  'delight','discover','drowsy','effort','foolish','forgive','gentle','grumble','improve','journey'
];

const stretching = [
  'absurd','adapt','adequate','agitate','astonish','baffle','banish','bewilder','boast','commotion',
  'compassion','conclude','confident','considerate','constant','convince','deceive','defend','defiant','devour',
  'dread','elaborate','essential','exaggerate','exceptional','exhausted','fascinate','flourish','forbid','frantic',
  'furious','hesitate','hostile','immense','impatient','inferior','inspect','intelligent','invincible','jubilant',
  'keen','linger','magnificent','mature','miserable','modest','mysterious','neglect','nuisance','obvious',
  'peculiar','peril','plentiful','predict','prevent','reluctant','require','resist','ridiculous','sensible',
  'sincere','sluggish','soar','stern','sufficient','superior','temporary','terrify','tremble','urgent',
  'venture','vital','wander','wretched','abrupt','accuse','alert','ambitious','appeal','approach',
  'arrogant','barren','blunder','cease','challenge','chaos','compliment','conflict','contrary','coward',
  'decline','desperate','dispute','endure','envy','essential','forbid','grief','harsh','heroic'
];

const ambitious = [
  'acquire','adversity','advocate','ambiguous','anticipate','apparent','articulate','audacious','authentic','benevolent',
  'coherent','compel','consequence','contemplate','credible','crucial','deliberate','deteriorate','discreet','diverse',
  'eloquent','empathy','endure','evaluate','evident','exemplary','feasible','formidable','futile','hypothesis',
  'impartial','inevitable','innovative','interpret','justify','meticulous','notorious','optimistic','persistent','plausible',
  'profound','prominent','prosper','rational','relevant','resilient','restrain','significant','substantial','tolerant',
  'transparent','trivial','unanimous','versatile','vulnerable','admirable','approximate','beneficial','capable','complex',
  'conventional','correspond','cumulative','demonstrate','distinct','dominate','efficient','emphasise','encounter','equivalent',
  'exceptional','exclude','frequent','fundamental','generate','hostile','illustrate','imply','influence','maintain',
  'modify','objective','obtain','perceive','priority','prohibit','reluctant','resolve','retain','transform',
  'valid','withdraw','abundant','contribute','contrast','deduce','diminish','establish','formulate','reluctant'
];

export const stages = [
  { name: 'Building confidence', words: confidence },
  { name: 'Stretching further', words: stretching },
  { name: 'Word master', words: ambitious }
];

export const wordBank = stages.flatMap((stage, stageIndex) =>
  stage.words.map(word => ({ word, stage: stageIndex }))
);
