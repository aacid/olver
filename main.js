const ALLOWED_CHARCODES = [
    ...Array.from(
        { length: 26 },
        (_, i) => `Key${String.fromCharCode(65 + i)}`
    ), // A-Z
    ...Array.from(
        { length: 26 },
        (_, i) => `Key${String.fromCharCode(97 + i)}`
    ), // a-z
    ...Array.from({ length: 10 }, (_, i) => `Digit${i}`), // 0-9
    "Space",
    "Minus",
    "Equal",
    "BracketLeft",
    "BracketRight",
    "Backslash",
    "Semicolon",
    "Quote",
    "Comma",
    "Period",
];

const INPUT_DIV = document.getElementById("input");
const OUTPUT_DIV = document.getElementById("output");

window.addEventListener("load", () => {
    INPUT_DIV.value = "";
});
window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addLine(`> ${INPUT_DIV.innerHTML}`);
        parseCommand(INPUT_DIV.innerHTML);
        INPUT_DIV.innerHTML = "";
    } else if (ALLOWED_CHARCODES.includes(event.code)) {
        INPUT_DIV.innerHTML += event.key;
    } else if (event.key === "Backspace") {
        INPUT_DIV.innerHTML = INPUT_DIV.innerHTML.slice(0, -1);
    }
});

const parseCommand = (commandLine) => {
    const words = commandLine.split(" ");
    const command = words[0];
    switch (command) {
        case "help":
            addLine("Available commands:");
            addLine("help - Show this message");
            addLine("clear - Clear the screen");
            addLine("ls - list files");
            addLine("cat - display file");
            break;
        case "clear":
            OUTPUT_DIV.innerHTML = "";
            break;
        case "ls":
            addLine("info photo");
            break;
        case "cat":
            switch (words[1]) {
                case "info":
                    addLine("Olver Labs is a software development company");
                    addLine("This page is work in progress");
                    addLine("");
                    addLine("olverweb v0.2");
                    break;
                case "photo":
                    window.open("cat.jpg", "_blank").focus();
                    break;
                default:
                    addLine("cat: invalid argument " + words[1]);
            }
            break;
        default:
            addLine("Command not found");
    }
};

const addLine = (content) => {
    const line = document.createElement("div");
    line.className = "line";
    if (content === "") {
        content = "\xa0";
    }
    line.textContent = content;
    document.getElementById("output").appendChild(line);
};
