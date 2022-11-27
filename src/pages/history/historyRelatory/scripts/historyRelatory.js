var history;

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

function createTable(history) {
    var table = document.getElementById("historyTable");

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
getHistory();

function radioButtonsListener(radioButton) {
    const rows = document.querySelectorAll("tbody tr");

    if (radioButton.checked) {
        rows.forEach((row) => {
            if (history.includes(row.querySelector("td").textContent.toLowerCase)) {
                console.log("Recarga");
            }
        })
    } 
}
radioButtonsListener()