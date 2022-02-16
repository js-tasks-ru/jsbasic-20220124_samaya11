function toggleText() {
  const toggleTextButton = document.querySelector('.toggle-text-button');

  function handlerToggler() {
    const text =  document.getElementById('text');
    text.hidden = !text.hidden;
  }

  toggleTextButton.addEventListener('click', handlerToggler);
}
