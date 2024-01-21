var jsdnd = jsdnd || {};

jsdnd.Controllers = jsdnd.Controllers || {};
jsdnd.Controllers.CharacterController = (function () {

    async function getClasses() {
        var classTypes = await jsdnd.Services.CharacterService.getClasses();
        jsdnd.Views.CharacterView.showClassTypes(classTypes);
    }

    function getClassDetails(classType) {
        return jsdnd.Services.CharacterService.getClassDetails(classType);
    }

    return {
        init: function () {
            console.log('CharacterController Initialized');
            document.getElementById("character-btn").addEventListener("click", getClasses);
        },

        getClassDetails: function (classType) {
            return getClassDetails(classType);
        }
    };
})();



