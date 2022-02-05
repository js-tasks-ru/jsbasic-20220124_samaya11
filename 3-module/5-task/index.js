function getMinMax(str) {
  let arr = str.split(' ');
  let min = Infinity, max = -Infinity;

  for (let value of arr) {
    if(isFinite(value)) {
      if(+value > max) max = +value;
      if(+value < min) min = +value;
    }
  }
  return {min: min, max: max};
}




