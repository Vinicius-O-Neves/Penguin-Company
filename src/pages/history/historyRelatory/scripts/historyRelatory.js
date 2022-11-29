var history, table;

const url = "http://localhost:5500/historicoRelatory";
function getHistory() {
    axios.get(url)
        .then(response => {
            history = response.data[0];
            createTable(response.data[0]);
            document.getElementById("pass_code").innerHTML = response.data[1];
        })
        .catch(error => console.log(error))
}
getHistory();

function createTable(history) {
    table = document.getElementById("historyTable");

    history.forEach(element => {
        Object.values(element).forEach((compraItems) => {
            let newRow = document.createElement("tr");
            compraItems.forEach(item => {
                let cell = document.createElement("td");
                console.log(item);
                cell.innerText=item;
                newRow.appendChild(cell);
            })
            table.appendChild(newRow);
        })
    });
}