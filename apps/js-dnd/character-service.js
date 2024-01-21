var jsdnd = jsdnd || {};

jsdnd.Services = jsdnd.Services || {};

jsdnd.Services.CharacterService = (function () {
    return {

        get: function(url) {
                return fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });        
        },

        getClasses: function () {
            return this.get("https://www.dnd5eapi.co/api/classes/");
        },

        getClassDetails: function (classType) {
            return this.get("https://www.dnd5eapi.co/api/classes/" + classType);
        },

    };
})();