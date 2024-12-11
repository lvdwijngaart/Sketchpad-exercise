
let divs = [];
let container = document.querySelector("#container");
const INITIAL_WIDTH = 16;

createGrid(INITIAL_WIDTH);

let resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", resetGrid);

let modes = [];

let randomRGBButton = document.querySelector("#randomRGB");
modes.push(randomRGBButton);

let darkenSquareButton = document.querySelector("#darkenSquare");
modes.push(darkenSquareButton);

randomRGBButton.addEventListener("click", () => {
    setActiveMode(randomRGBButton, darkenSquareButton)
});
darkenSquareButton.addEventListener("click", () => {
    setActiveMode(darkenSquareButton, randomRGBButton)
});


function createGrid(width) {
    for (let i = 0; i < width*width; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "square");
        div.setAttribute("id", i);
        div.style.cssText = `flex: 0 0 calc(100%/${width})`;
        div.style.backgroundColor = "#000000";
        div.style.opacity = 0;
        div.addEventListener("mouseover", () => {
            modes.forEach(mode => {
                if(mode.classList.contains("active")) {
                    switch (mode.id) {
                        case "randomRGB": 
                            setRandomRGBEffect(div);
                            console.log("RGB is set")
                            break;
                        case "darkenSquare": 
                            setDarkenSquareEffect(div);
                            break;
                        default: 
                            setRandomRGBEffect(div);
                    }
                }
            });
        });
        divs.push(div);
        container.appendChild(div);
    }
}

function resetGrid() {
    let width = prompt("What size should your grid have? (0-100, higher number => smaller pixels)")
    if (width > 100 || width < 0) {
        alert("You entered an invalid number")
        return;
    }

    clearContainerDiv();
    createGrid(width);
}

function clearContainerDiv() {
    let array = Array.from(container.childNodes)
    array.forEach(element => {
        container.removeChild(element);
    });
}
function setRandomRGBEffect(div) {
    let red = Math.floor((Math.random() * 255));
    let green = Math.floor((Math.random() * 255));
    let blue = Math.floor((Math.random() * 255));
    let opacity = Math.floor((Math.random()*10))/10;
    let rgbColor = `rgb(${red}, ${green}, ${blue})`;
    console.log("Random color:", rgbColor, div.style.opacity);  // Debugging output
    div.style.backgroundColor = rgbColor;
    div.style.opacity = opacity;
}


function setDarkenSquareEffect(div) {
    // Get the current opacity value from inline style, default to 1 if not set
    let oldOpacity = parseFloat(div.style.opacity) || 0; 

    // Increase opacity by 0.1, but make sure it doesn't exceed 1
    let newOpacity = Math.min(oldOpacity + 0.1, 1);

    // Set the new opacity value
    div.style.opacity = newOpacity;

    // For debugging: Log the old and new opacity values
    console.log("Old opacity:", oldOpacity);
    console.log("New opacity:", newOpacity);
}

function setActiveMode(button, removeClassFromButton) {

    if (!button.classList.contains("active")) {
        button.classList.add("active");
        console.log(button.classList);
    }
    if (removeClassFromButton.classList.contains("active")) {
        removeClassFromButton.classList.remove("active");
    }
}
