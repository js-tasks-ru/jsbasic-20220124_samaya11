function highlight(table) {

  let tBody = table.tBodies[0];

  for (let i = 0; i < tBody.rows.length; i++) {
    if(tBody.rows[i].cells[3].dataset.available == 'true') {
      tBody.rows[i].classList.add('available');
    } else if(tBody.rows[i].cells[3].dataset.available == 'false') {
      tBody.rows[i].classList.add('unavailable');
    } else {
      tBody.rows[i].setAttribute('hidden', 'true');
    }

    if(tBody.rows[i].cells[2].textContent === 'm') {
      tBody.rows[i].classList.add('male');
    }

    if (tBody.rows[i].cells[2].textContent === 'f') {
      tBody.rows[i].classList.add('female');
    }

    if(Number(tBody.rows[i].cells[1].textContent) < 18) {
      tBody.rows[i].style.textDecoration = 'line-through';
    }
  }
}
