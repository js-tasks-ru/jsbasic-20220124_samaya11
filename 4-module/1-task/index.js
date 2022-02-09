function makeFriendsList(friends) {

  const newUl = document.createElement('UL');

  function createLi(firstName, lastName) {
   const newLi = document.createElement('LI');
   newLi.textContent = firstName + ' ' + lastName;
   return newLi;
  }

  for (let friend of friends) {
    newUl.append(createLi(friend.firstName, friend.lastName));
  }
  return newUl;
}
