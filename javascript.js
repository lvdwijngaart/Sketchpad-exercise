
let divs = [];
let container = document.querySelector("#container");
const INITIAL_WIDTH = 16;

createGrid(INITIAL_WIDTH);

let resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", resetGrid);

function createGrid(width) {
    for (let i = 0; i < width*width; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "square");
        div.setAttribute("id", i);
        div.style.cssText = `flex: 0 0 calc(100%/${width});`
        div.addEventListener("mouseover", () => {
            setHoverEffect(div);
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

function setHoverEffect(div) {
    div.style.backgroundColor = "pink";
}
