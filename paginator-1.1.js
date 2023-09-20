class Paginator {
    items;
    itemsPerPage = 10;
    container;
    controls;
    currentPage = 1;
    pages;

    paginate() {
        this.pages = [];
        while (this.items.length > 0) {
            this.pages.push(this.items.splice(0, this.itemsPerPage));
        }
        this.changePage(this.currentPage);
    }

    previousPage() {
        if (this.currentPage != 1) {
            this.currentPage--;
            this.changePage(this.currentPage);
        }
    }

    nextPage() {
        if (this.currentPage != this.pages.length) {
            this.currentPage++;
            this.changePage(this.currentPage);
        }
    }

    changePage(page_num) {
        this.currentPage = page_num;
        let paginator = this.container;
        paginator.innerHTML = "";
        for (var item in this.pages[this.currentPage - 1]) {
            paginator.innerHTML +=
                `
            ${this.pages[this.currentPage - 1][item].id}<br>
            `;
        }
        paginator.innerHTML += `<br>`;

        let controls = this.controls;
        controls.innerHTML = "";

        controls.innerHTML +=
            `
        <button onclick='paginator.previousPage()' style='width:auto;'>Previous</button>
        `;

        controls.innerHTML +=
            `
        <button onclick='paginator.nextPage()'>Next</button>
        `;
    }
}