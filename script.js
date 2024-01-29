function getNavbar(){
    const path = window.location.pathname.split('/');
    const loc = path[0]+"/"+path[1]+"/"+path[2];
    document.querySelector(`.navbar`).innerHTML = `
        <nav>
            <div class = 'dropdown'>
                <a href="${loc}/index.html" class = "dropdown-button">Cadastros</a>
                <div class = "dropdown-list">
                    <a href="${loc}/users/index.html">Usuário</a>
                    <a href="${loc}/clients/index.html">Cliente</a>
                    <a href="${loc}/products/index.html">Produto</a>
                </div>
            </div>
        </nav> 
    `;
}
getNavbar();

function search() {
    // Get the search input value
    var input = document.getElementById('searchInput').value.toLowerCase();
    // Get the selected option value
    var option = document.getElementById('searchOption').value;
    // Get the table rows
    var rows = document.querySelectorAll('#searchResults tbody tr');
    
    // Loop through each row
    rows.forEach(function(row) {
        // Get the cell value for the selected option
        var cellValue = row.querySelector('td:nth-child(' + (parseInt(option) + 1) + ')').innerText.toLowerCase();
        // Show or hide the row based on the search input value
        if (cellValue.indexOf(input) > -1) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

export function setApiOptions (apiMethod, obj){
    let options = {
      method: apiMethod,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if(apiMethod === 'POST') options.body = JSON.stringify(obj);
    return options;
}

//Usable only when the objects have the same keys
export function objListToArray(objList){    
    let array = [];
    // array.push(Object.keys(objList[0]));
    objList.forEach((obj) => {
        array.push(Object.values(obj));
    });
    return array;
}

export function createTable(array){
    const table = document.createElement('table');
    for (let i=0;i<array.length;i++) {
    let row = document.createElement('tr');
    for (let j=0;j<array[i].length;j++){
        let cell;
        if(i == 0){
            cell = document.createElement('th');
        }else{
            cell = document.createElement('td');
        }
        cell.textContent = array[i][j];
        row.appendChild(cell);      
    }
    table.appendChild(row);
    }
    return table;
}

export function formatDate(string){
    const date = new Date(string);
    const day = date.getDate().toString().padStart(2,'0');
    const month = (date.getMonth()+1).toString().padStart(2,'0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2,'0');
    const minutes = date.getMinutes().toString().padStart(2,'0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}