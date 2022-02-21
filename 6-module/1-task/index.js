/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {

  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();


  }

  createRow(userName, userAge,userSalary,userCity) {
    const row = document.createElement('tr');
    row.insertAdjacentHTML('beforeend',
    `<th style="border: 1px solid black">${userName}</th>
    <th style="border: 1px solid black">${userAge}</th>
    <th style="border: 1px solid black">${userSalary}</th>
    <th style="border: 1px solid black">${userCity}</th>
    <th style="border: 1px solid black"><button class="remove-button">x</button></th>`);
    return row;

  }

  render() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    thead.insertAdjacentHTML('afterbegin',
    `<tr>
    <th>Имя</th>
    <th>Возраст</th>
    <th>Зарплата</th>
    <th>Город</th>
    <th></th>
    </tr>`);
    table.append(thead);
    table.append(tbody);



    for (const row of this.rows) {
      tbody.append(this.createRow(row.name, row.age, row.salary, row.city));
    }

    table.addEventListener('click', this.onClick);

    return table;
  }

  onClick(event) {
    if (event.target.className != 'remove-button') return;

    let pane = event.target.closest('tr');
    pane.remove();
  };


}
