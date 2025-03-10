const puzzleContainer = document.getElementById("puzzle-container");
let imageSrc = "clr.jpg";
let pieces = [];
let selectedPiece = null;

function createPuzzle(image) {
    puzzleContainer.innerHTML = "";
    pieces = [];
    for (let i = 0; i < 25; i++) {
        const piece = document.createElement("div");
        piece.classList.add("piece");
        let x = (i % 5) * -25 + "%";
        let y = Math.floor(i / 5) * -25 + "%";
        piece.style.backgroundImage = `url('${image}')`;
        piece.style.backgroundPosition = `${x} ${y}`;
        piece.dataset.index = i;
        piece.draggable = true;
        piece.addEventListener("dragstart", dragStart);
        piece.addEventListener("dragover", dragOver);
        piece.addEventListener("drop", drop);
        pieces.push(piece);
        puzzleContainer.appendChild(piece);
    }
}

function shufflePieces() {
    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

function dragStart(event) {
    selectedPiece = event.target;
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    if (selectedPiece && event.target !== selectedPiece) {
        let tempIndex = selectedPiece.dataset.index;
        selectedPiece.dataset.index = event.target.dataset.index;
        event.target.dataset.index = tempIndex;
        puzzleContainer.insertBefore(selectedPiece, event.target.nextSibling);
    }
}

function exitGame() {
    alert("Saliendo del juego");
    window.close();
}

document.getElementById("imageLoader").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageSrc = e.target.result;
            createPuzzle(imageSrc);
        };
        reader.readAsDataURL(file);
    }
});

createPuzzle(imageSrc);