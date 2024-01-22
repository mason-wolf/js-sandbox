var jsdnd = jsdnd || {};

jsdnd.Views = jsdnd.Views || {};
jsdnd.Views.CharacterView = (function () {

    let selectedClass;

    function createCharacter() {
        selectedClass["level"] = 1;
        var playerName = document.getElementById("player-name").value;
        selectedClass["player_name"] = playerName;
        localStorage.setItem("player", JSON.stringify(selectedClass));
    }

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

    function getEquipmentByName(equipmentName) {
        jsdnd.Controllers.CharacterController.getEquipmentByName(equipmentName);
    }

    return {
        getEquipmentByName: function(equipmentName) {
            console.log(equipmentName);
        },
        showEquipment: function(equipment) {
            equipment = JSON.parse(equipment);
            var contentElement = document.getElementById("content");
            contentElement.innerHTML = ""; // Clear existing content
    
            equipment["equipment"].forEach(item => {
                var equipBtn = document.createElement("button");
                equipBtn.innerHTML = "Equip";
                equipBtn.dataset.itemId = item; // Use dataset to store item ID
                contentElement.appendChild(document.createTextNode(item));
                contentElement.appendChild(equipBtn);
                contentElement.appendChild(document.createElement("br"));
            });
    
            // Attach a single event listener to the parent element
            contentElement.addEventListener("click", function(event) {
                var clickedElement = event.target;
    
                // Check if the clicked element is a button with a dataset.itemId
                if (clickedElement.tagName === "BUTTON" && clickedElement.dataset.itemId) {
                    getEquipmentByName(clickedElement.dataset.itemId);
                }
            });
        }
        ,
        // Show character class options.
        showClassTypes: function(classTypes) {
            document.getElementById("content").innerHTML = "";
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
                const equipment = [];
                var data = JSON.parse(JSON.stringify(classTypes));

                data["starting_equipment_options"].forEach(item => {
                    getNestedValues(item, equipment);
                });
                
                document.getElementById("class-description").innerHTML = "";
                var playerName = document.createElement("input");
                playerName.id = "player-name";
                playerName.type = "text";
                document.getElementById("class-description").innerHTML += `
                <br>Player Name: <input type='text' id='player-name'><br>
                `;
                document.getElementById("class-description").innerHTML += "<h1>Starting Gear</h1><br>";
                equipment.forEach(item => {
                    document.getElementById("class-description").innerHTML += item + "<br>";
                });

                var playButton = document.createElement("button");
                playButton.innerHTML = "Play";
                playButton.addEventListener("click", createCharacter);
                document.getElementById("class-description").appendChild(playButton);
                selectedClass = classTypes;
                selectedClass["equipment"] = equipment;
            })
        }
    };
})();
