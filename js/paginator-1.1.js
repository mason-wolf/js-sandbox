/**
 * Creates an Paginator object.
 */
class Paginator {
    // List of records or items.
    items;
    // Max items per page.
    itemsPerPage = 10;
    // Div container with paginated items.
    container;
    // Div container with pagination controls.
    controls;
    currentPage = 1;
    pages;

    /**
     * Split items into pages.
     */
    paginate() {
        this.pages = [];
        while (this.items.length > 0) {
            this.pages.push(this.items.splice(0, this.itemsPerPage));
        }
        this.changePage(this.currentPage);
    }

    /**
     * Previous page.
     */
    previousPage() {
        if (this.currentPage != 1) {
            this.currentPage--;
            this.changePage(this.currentPage);
        }
    }

    /**
     * Next page.
     */
    nextPage() {
        if (this.currentPage != this.pages.length) {
            this.currentPage++;
            this.changePage(this.currentPage);
        }
    }

    /**
     * Change page.
     * @param {*} page_num Page Number
     */
    changePage(page_num) {
        this.currentPage = page_num;
        let paginator = this.container;
        paginator.innerHTML = "";

        // Append the item data to the container.
        for (var item in this.pages[this.currentPage - 1]) {
            paginator.innerHTML +=
                `
            ${this.pages[this.currentPage - 1][item].id}<br>
            `;
        }
        paginator.innerHTML += `<br>`;

        // Add the controls.
        let controls = this.controls;
        controls.innerHTML = "";

        // Previous button.
        controls.innerHTML +=
            `
        <button onclick='paginator.previousPage()' style='width:auto;'>Previous</button>
        `;

        // Next button.
        controls.innerHTML +=
            `
        <button onclick='paginator.nextPage()'>Next</button>
        `;
    }
}