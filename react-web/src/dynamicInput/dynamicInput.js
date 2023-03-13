let minRows = 1;
let maxRows = 10;

function allowTextareasToDynamicallyResize() {
    let textareas = document.getElementsByTagName('textarea');
    
    for (let i = 0; i < textareas.length; i++) {
      textareas[i].setAttribute('rows', minRows); // Set the initial number of rows to 1
      textareas[i].style.height = textareas[i].scrollHeight + 'px';
      
      textareas[i].addEventListener('input', (e) => {
        let lineHeight = parseInt(getComputedStyle(e.target).lineHeight);
        let rows = Math.floor(e.target.scrollHeight / lineHeight);

        // checks for min and max rows
        if (rows < minRows) {
            rows = minRows;
        } 
        else if (rows > maxRows) {
            rows = maxRows;
            // Show the scrollbar when number of rows exceeds maxRows
            e.target.style.overflowY = 'scroll';
        } 
        else {
            // Hide the scrollbar when number of rows is between minRows and maxRows
            e.target.style.overflowY = 'hidden';
        }
        e.target.setAttribute('rows', rows); // Update the number of rows
        e.target.style.height = 'auto'; // Reset the height before setting it based on the number of rows
        e.target.style.height = rows * lineHeight + 'px';
      });
      textareas[i].style.overflowY = 'hidden';
    }
}

export default allowTextareasToDynamicallyResize;