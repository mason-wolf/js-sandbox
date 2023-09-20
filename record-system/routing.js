function getSearchParams() {
    const searchQuery = window.location.search;
    const urlParams = new URLSearchParams(searchQuery);
    let record_id = urlParams.get('record_id');
    if (record_id != null) {
        record = getRecordById(record_id);
        if (record != null) {
            document.getElementById("record-view").innerHTML = `
        <h1>${record.title}</h1>
        <button class='remove-button' onclick='deleteRecord("${record.id}")'>Delete Record</button>
        `;
        }
    }
}

loadRecords();
getSearchParams();
