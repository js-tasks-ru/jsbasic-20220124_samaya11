function filterRange(arr, a, b) {
  let newArr = [];

  for (let value of arr) {
    if(value >= a && value <= b) newArr.push(value);
  }
  return newArr;
}
