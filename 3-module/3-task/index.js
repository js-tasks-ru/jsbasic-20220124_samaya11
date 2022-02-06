function camelize(str) {
  let newArr = str.split('-');

  for( let i = 1; i < newArr.length; i++) {
    newArr[i] = newArr[i][0].toUpperCase() + newArr[i].substr(1,newArr[i].length - 1);
  }

  return newArr.join("");
}
