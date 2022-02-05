 function showSalary(users, age) {
  let salaries = users.reduce((salary,user) => {
    if(user.age <= age) {
      salary.push(user.name + ', ' + user.balance);
    }
    return salary;
   }, []);

  return salaries.join('\n');

// let suitableUsers = users.filter(user => {
//   return user.age <= age;
// });

// let salaryUsers = suitableUsers.map(item => {
//   return item.name + ', ' + item.balance;
// });

// return salaryUsers.join('\n');

}

