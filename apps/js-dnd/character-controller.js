var jsdnd = jsdnd || {};

jsdnd.Controllers = jsdnd.Controllers || {};
jsdnd.Controllers.CharacterController = (function () {

    async function getClasses() {
        var classTypes = await jsdnd.Services.CharacterService.getClasses();
        jsdnd.Views.CharacterView.showClassTypes(classTypes);
    }

    async function getEquipmentByName(equipmentName) {
        var equipmentName = await jsdnd.Services.CharacterService.getEquipmentByName(equipmentName);
        jsdnd.Views.CharacterView.getEquipmentByName(equipmentName);
    }

    function getClassDetails(classType) {
        return jsdnd.Services.CharacterService.getClassDetails(classType);
    }

    function getEquipment() {
        let equipment = jsdnd.Services.CharacterService.getEquipment();
        jsdnd.Views.CharacterView.showEquipment(equipment);
    }

    return {
        init: function () {
            console.log('CharacterController Initialized');
            document.getElementById("character-btn").addEventListener("click", getClasses);
            document.getElementById("character-equipment-btn").addEventListener("click", getEquipment);
        },

        getClassDetails: function (classType) {
            return getClassDetails(classType);
        },
        
        getEquipmentByName: function (equipmentName) {
            return getEquipmentByName(equipmentName);
        }
    };
})();



