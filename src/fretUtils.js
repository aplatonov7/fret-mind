/** Internally, only sharps are used to check the answers */
const FRETBOARD = [
  ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"],
  ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
  ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"],
  ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D"],
  ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"],
  ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"],
];

/** Gets the answer for a given fret from string one to six */
function getOneToSixAns(fret) {
  const res = [];
  for (let i = 0; i < 6; i++) {
    res.push(FRETBOARD[i][fret]);
  }
  return res;
}

/** Gets the answer for a given fret from string six to one */
function getSixToOneAns(fret) {
  const res = [];
  for (let i = 5; i >= 0; i--) {
    res.push(FRETBOARD[i][fret]);
  }
  return res;
}

/** Transforms user input to the format that can be validated easily */
function transformInput(val) {
  return val.trim()
    .replace(/\,+/g, " ")
    .replace(/\.+/g, " ")
    .replace(/\s+/g,' ')
    .toUpperCase()
    // Get the notes to expected format (just sharps). This does not handle double sharps / flats.
    .replace(/AB/g, "G#")
    .replace(/BB/g, "A#")
    .replace(/CB/g, "B")
    .replace(/DB/g, "C#")
    .replace(/EB/g, "D#")
    .replace(/FB/g, "E")
    .replace(/GB/g, "F#")
    .replace(/B#/g, "C")
    .replace(/E#/g, "F");
}

/** Checks whether answer provided by the user for a given fret is correct for string 6 to 1. */
export function validateSixToOneInput(val, fret) {
  return transformInput(val) === getSixToOneAns(fret).join(" ");
}

/** Checks whether answer provided by the user for a given fret is correct for string 1 to 6. */
export function validateOneToSixInput(val, fret) {
  return transformInput(val) === getOneToSixAns(fret).join(" ");
}

/** Generates a permutation of all integers from 1 to 12 */
export function generatePermutation() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const res = [];
  
  while (items.length > 0) {
    // Pick a random elements from the pool
    const ind = Math.floor(Math.random() * items.length);
    const el = items[ind];
    // Add an element to result
    res.push(el);
    // Remove an element from the pool
    items[ind] = items[items.length - 1];
    items.pop();
  }
  
  // Return the permutation
  return res;
}
