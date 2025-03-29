let editor;

// Load Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.38.0/min/vs' }});
require(["vs/editor/editor.main"], function () {
    editor = monaco.editor.create(document.getElementById("editor-container"), {
        value: "// Write your JavaScript here...\nconsole.log('Quantum Debugger Loaded!');",
        language: "javascript",
        theme: "vs-dark",
        fontSize: 14,
    });
});

// Run Code Execution
document.getElementById("run-btn").addEventListener("click", function () {
    const code = editor.getValue();
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    // Custom console log redirection
    const log = (...args) => {
        outputDiv.innerHTML += "<span style='color: lightgreen'>" + args.join(" ") + "</span><br>";
    };

    try {
        const console = { log };
        const func = new Function("console", code);
        func(console);
    } catch (error) {
        outputDiv.innerHTML = "<span style='color: red'><b>Error:</b> " + error.message + "</span>";
    }
});
