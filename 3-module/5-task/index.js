function getMinMax(str) {
  let arr = str.split(' ');
  let numArr = [];

  for (let value of arr) {
    if(isFinite(value)) {
      numArr.push(value);
    }
  }

  let min = Math.min.apply(null,numArr);
  let max = Math.max.apply(null,numArr);
  return {min: min, max: max};
}




