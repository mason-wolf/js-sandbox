let records = [];

class Record {
    constructor(title) {
        this.id = crypto.randomUUID();
        this.title = title;
    }
}

function addRecord() {
    let recordTitle = document.getElementById("record_title").value;
    if (recordTitle != '') {
        let record = new Record(recordTitle);
        records.push(record);
        populateRecords();
        localStorage.setItem("records", JSON.stringify(records));
    }
}

function populateRecords() {
    document.getElementById("records-list").innerHTML = "";
    console.log(records);
    records.forEach(r => {
        document.getElementById("records-list").innerHTML += `
        <div><a href='${window.location.href.split('?')[0]}?record_id=${r.id}'>${r.title}</a></div>
        `;
    })
}
function getRecordById(record_id) {
    return records.find(r => r.id === record_id);
}

function deleteRecord(record_id) {
    console.log(record_id);
    records = records.filter(function (r) {
        return r.id !== record_id;
    });     
    populateRecords();
    localStorage.setItem("records", JSON.stringify(records));
}