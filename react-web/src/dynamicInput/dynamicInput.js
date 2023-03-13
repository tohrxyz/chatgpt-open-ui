function allowTextareasToDynamicallyResize() {
    let textareas = document.getElementsByTagName('textarea');
    for (let i = 0; i < textareas.length; i++) {
      textareas[i].style.height = textareas[i].scrollHeight + 'px';
      textareas[i].addEventListener('input', (e) => {
        e.target.style.height = e.target.scrollHeight + 'px';
      });
      textareas[i].style.overflowY = 'hidden';
    }
}

export default allowTextareasToDynamicallyResize;