export default function compareObj(actualObj, changedObj) {
  const keys = Object.keys(actualObj);
  const result = {};

  for (const eachKey of keys) {
    if (actualObj[eachKey] !== changedObj[eachKey]) {
      result[eachKey] = changedObj[eachKey];
    }
  }
  return result;
}
