document.getElementById('sortButton').addEventListener('click', () => {
    const selectedOption = document.getElementById('sortOptions').value;
    sortTable(selectedOption);
});
document.getElementById('sortButton1').addEventListener('click', () => {
    const selectedOption = document.getElementById('sortOptions1').value;
    sortTable1(selectedOption);
});
function sortTable(column) {
    const table = document.querySelector('.table');
    const header = table.querySelector('.header');
    const rows = Array.from(table.querySelectorAll('.row:not(.header)'));

    const sortedRows = rows.sort((a, b) => {
        const aCell = a.querySelector(`.cell[data-column="${column}"]`);
        const bCell = b.querySelector(`.cell[data-column="${column}"]`);

        if (!aCell || !bCell) {
            console.error('Cell not found for column:', column);
            return 0;
        }

        const aText = aCell.textContent.trim();
        const bText = bCell.textContent.trim();
        const aIsNumeric = !isNaN(Number(aText));
        const bIsNumeric = !isNaN(Number(bText));

        // Determine if the column is numeric or string
        if (column === 'Order No.') {
            return Number(aText) - Number(bText); // Numeric comparison for age
        }else if(column === 'Quantity'){
            return Number(aText) - Number(bText);
        } else {
            return aText.localeCompare(bText); // String comparison for name and country
        }
    });

    // Clear the table and append sorted rows
    // Instead of appending, we will insert before the header
    sortedRows.forEach(row => {
        table.insertBefore(row, header.nextSibling);
        table.style.overflow = 'auto';
        header.style.position = 'sticky';
        header.style.zIndex = '1';
        header.style.top = '0';
        header.style.background = 'white';
        header.style.borderBottom = '1px solid black'
        // Insert after the header
    });

}
function sortTable1(column) {
    const table1 = document.querySelector('.table1');
    const header1 = table1.querySelector('.header1');
    const rows1 = Array.from(table1.querySelectorAll('.row1:not(.header1)'));

    const sortedRows = rows1.sort((a, b) => {
        const aCell = a.querySelector(`.cell1[data-column="${column}"]`);
        const bCell = b.querySelector(`.cell1[data-column="${column}"]`);

        if (!aCell || !bCell) {
            console.error('Cell not found for column:', column);
            return 0; // Skip sorting if cell is not found
        }

        const aText = aCell.textContent.trim();
        const bText = bCell.textContent.trim();

        // Determine if the column is numeric or string
        if (column === 'Order No.' || column === 'Quantity') {
            return Number(aText) - Number(bText); // Numeric comparison for age
        } else {
            return aText.localeCompare(bText); // String comparison for name and country
        }
    });

    // Clear the table and append sorted rows
    // Instead of appending, we will insert before the header
    sortedRows.forEach(row => {
        table1.insertBefore(row, header1.nextSibling);
        table1.style.overflow = 'auto';
        header1.style.position = 'sticky';
        header1.style.zIndex = '1';
        header1.style.top = '0';
        header1.style.background = 'white';
        header1.style.borderBottom = '1px solid black'
        // Insert after the header
    });

}