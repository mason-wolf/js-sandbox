function saveRecords() {
    localStorage.setItem("records", JSON.stringify(records));
    showSaveStatus();
}

function loadRecords() {
    recordList = localStorage.getItem("records");
    if (recordList != null) {
        records = JSON.parse(recordList);
        populateRecords();
    }
}

function showSaveStatus() {
    document.getElementById('save-status').style.display = "block";
    setTimeout(function() {
        document.getElementById('save-status').style.display = "none";
    }, 3000);
}
