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

        getEquipment: function() {
            let player = localStorage.getItem("player");
            return player;  
        },

        getEquipmentByName: function(equipmentName) {
            if (equipmentName) {
                equipmentName = String(equipmentName.toLowerCase());
                return this.get("https://www.dnd5eapi.co/api/equipment/" + equipmentName);
            }
        }

    };
})();