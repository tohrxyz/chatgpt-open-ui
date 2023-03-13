let prevContentHeight = 0;

function getTextareaRowsCount(textarea) {
    const styles = window.getComputedStyle(textarea);
    const lineHeight = parseInt(styles.lineHeight);
    const borderSize = parseInt(styles.borderTopWidth) + parseInt(styles.borderBottomWidth);
    const paddingSize = parseInt(styles.paddingTop) + parseInt(styles.paddingBottom);
    const contentHeight = textarea.scrollHeight - paddingSize - borderSize;

    let rowsCount = Math.ceil(contentHeight / lineHeight);
    
    if (contentHeight <= prevContentHeight) {
        rowsCount -= (prevContentHeight - contentHeight) / lineHeight;
    }
    
    prevContentHeight = contentHeight;

    return rowsCount;
}

export default getTextareaRowsCount;