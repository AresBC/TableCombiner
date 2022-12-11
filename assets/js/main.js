"use strict"

window.addEventListener("load", main)

function fetchUploadedFileData(event) {
    return event.target.files[0].text()
}


function Table(uploadField) {
    this.uploadField = uploadField
    this.ele = document.createElement("div")
    this.data = undefined
    this.rows = []
}

function firstEleOfArray(arr) {
    for (const ele of arr) return ele
}

function renderTable(table) {
    let renderedTable = "<table class=\"table table-dark table-striped\">"
    let colId = 0
    const headItems = Object.keys(firstEleOfArray(table))
    renderedTable += renderTableHead(headItems)
    for (const [k, row] of Object.entries(table)) {
        renderedTable += renderRow(row, ++colId)
    }
    return renderedTable + '</table>'
}

function renderTableHead(head) {
    let renderedHead = `<thead><tr><th scope="col"><input name="primary" type="radio"></th>`
    for (const headItem of head) {
        renderedHead += `<th scope="col">${headItem}</th>`
    }
    return renderedHead + `</tr></thead>`
}

function renderRow(row, colId) {
    let renderedRow = `<tr><th scope=\"row\">${colId}</th>`
    for (const [k, field] of Object.entries(row)) {
        renderedRow += renderField(field)
    }
    return renderedRow + '</tr>'
}

function renderField(field) {
    return `<td>${field}</td>`
}

function convertData(data) {
    return JSON.parse(data)
}


const exampleTable = `
<table class="table table-dark table-striped">
<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">name</th>
        <th scope="col">age</th>
        <th scope="col">city</th>
        <th scope="col">street</th>
        <th scope="col">date</th>
        <th scope="col">Info</th>
    </tr>
</thead>
<tbody>
    <tr class="table-warning">
        <th scope="row">1</th>
        <td>Holger</td>
        <td>25</td>
        <td>Berlin</td>
        <td>Monkey-Straße 23</td>
        <td>01-01-2021</td>
        <td><img height="20" src="./assets/information.png" "></td>
    </tr>
    <tr class="table-danger">
        <th scope="row">2</th>
        <td>Erni</td>
        <td>21</td>
        <td>Frankfurt</td>
        <td>Sesamstraße 45</td>
        <td>01-01-2020</td>
        <td><img height="20" src="./assets/information.png" "></td>
    </tr>
    <tr class="table-success">
        <th scope="row">3</th>
        <td>Lutz</td>
        <td>100</td>
        <td>München</td>
        <td>Höhlenstraße 666</td>
        <td>01-01-2020</td>
        <td><img height="20" src="./assets/information.png" "></td>
    </tr>
    <tr class="table-secondary">
        <th scope="row">4</th>
        <td>Simone</td>
        <td>22</td>
        <td>Hamburg</td>
        <td>Fakestreet 123</td>
        <td>01-01-2020</td>
        <td><img height="20" src="./assets/information.png" "></td>
    </tr>
    <tr class="table-primary">
        <th scope="row">4</th>
        <td>Julia</td>
        <td>27</td>
        <td>Bremen</td>
        <td>Not A Fakestreet 123</td>
        <td>01-01-2020</td>
        <td><img height="20" src="./assets/information.png" "></td>
    </tr>
</tbody>
</table>
`

async function main() {
    const app = document.querySelector("#app")

    const tables = {
        one: new Table(document.querySelector("#table-one")),
        two: new Table(document.querySelector("#table-two")),
    }

    const allSelected = function () {
        for (const [key, table] of Object.entries(tables)) {
            if (table.data === undefined) return false
        }
        return true
    }

    const mergeBtn = document.querySelector("#mergeable")

    for (const [key, table] of Object.entries(tables)) {
        table.uploadField.addEventListener("change", async (ev) => {
            table.data = await fetchUploadedFileData(ev)
            table.rows = convertData(table.data)
            if (allSelected()) {
                mergeBtn.classList.remove("btn-secondary")
                mergeBtn.classList.add("btn-success")
            }
            table.ele.innerHTML = renderTable(table.rows)
            app.appendChild(table.ele)
        })
    }

    mergeBtn.addEventListener("click", () => {
        if (!allSelected()) {
            alert("select both table files")
            return
        }

        const copiedTable = tables.one.ele.cloneNode(true)
        copiedTable.innerHTML = exampleTable
        app.appendChild(copiedTable)

        const warningEles = document.querySelectorAll(".table-warning img")
        for (let ele of warningEles) {
            console.log("lol")
            ele.addEventListener("mouseover", () => {
                alert("Gelb bedeutet, dass der Datensatz mit dem Primärdaten vereinigt wurde.")
            })
        }
    })
}
