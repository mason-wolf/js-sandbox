let records = [];

for (var i = 0; i < 34; i++) {
    records.push(new Record())
}

var itemsPerPage = 10;
var pages = [], size = itemsPerPage;
while (records.length > 0) {
    pages.push(records.splice(0, size))
}

var currentPage = 1;

changePage(currentPage);

function previousPage() {
    if (currentPage != 1) {
        currentPage -= 1;
        changePage(currentPage);
    }
}

function nextPage() {
    if (currentPage != pages.length) {
        currentPage += 1;
        changePage(currentPage);
    }
}

function changePage(page_num) {
    currentPage = page_num;
    let paginator = document.getElementById("paginator");
    paginator.innerHTML = "";
    for (var record in pages[currentPage - 1]) {
        paginator.innerHTML += `
        ${pages[currentPage - 1][record].id}<br>
        `;
    }
    paginator.innerHTML += `<br>`;

    let controls = document.getElementById("pagination-controls");
    controls.innerHTML = "";

    controls.innerHTML += `
<button onclick='previousPage()' style='width:auto;'>Previous</button>
`;
    // for (var i = 0; i < pages.length; i++) {
    //     controls.innerHTML += `
    //     <button onclick='changePage(${i + 1})''>${i + 1}</button>
    //     `;
    // }

    controls.innerHTML += `
<button onclick='nextPage()'>Next</button>
`;
}