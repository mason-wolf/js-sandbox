var jsdnd = jsdnd || {};

jsdnd.Views = jsdnd.Views || {};
jsdnd.Views.CharacterView = (function () {

    function getNestedValues(obj, result) {
        for (const key in obj) {
            if (key === 'name' && typeof obj[key] === 'string') {
                result.push(obj[key]);
            } else if (typeof obj[key] === 'object' && obj[key] !== null 
            && key !== "equipment_category" && key !== "proficiency") {
                getNestedValues(obj[key], result);
            }
        }
    }

    return {
        // Show character class options.
        showClassTypes: function(classTypes) {
            for (var classType in classTypes["results"]) {
                var charClass = classTypes["results"][classType];
                var classLink = document.createElement("a");

                classLink.href = "#class-" + charClass.name.toLowerCase();

                classLink.textContent = charClass.name;
                classLink.addEventListener("click", (function (clickedClass) {
                    return function(event) {
                        event.preventDefault();
                        jsdnd.Views.CharacterView.showStartingGear(clickedClass);
                    };
                })(charClass));

                document.getElementById("content").appendChild(classLink);
                document.getElementById("content").appendChild(document.createElement("br"));
                var classDescriptionDiv = document.createElement("div");
                classDescriptionDiv.id = "class-description";
                document.body.appendChild(classDescriptionDiv);
            }
        },

        // Show starting gear.
        showStartingGear: function(charClass) {
            jsdnd.Controllers.CharacterController.getClassDetails(charClass.index)
            .then(function(classTypes) {
                const resultArray = [];
                var data = JSON.parse(JSON.stringify(classTypes));
                console.log(data);
                data["starting_equipment_options"].forEach(item => {
                    getNestedValues(item, resultArray);
                });
                
                document.getElementById("class-description").innerHTML = "";
                document.getElementById("class-description").innerHTML = "<h1>Starting Gear</h1><br>";
                resultArray.forEach(item => {
                    document.getElementById("class-description").innerHTML += item + "<br>";
                })
            })
        }
    };
})();
