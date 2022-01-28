function truncate(str, maxlength) {
  // ваш код...
  if (str.length <= maxlength) return str;

  return str.substr(0, maxlength - 1) + '…';

}
