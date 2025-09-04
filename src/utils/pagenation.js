export default function pagination(totalNo, stepSize) {
  const result = [];

  for (let start = 0; start < totalNo; start += stepSize) {
    let end = Math.min(start + stepSize, totalNo);
    result.push([start + 1, end]);
  }

  return result;
}
