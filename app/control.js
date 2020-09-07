import '../assets/style.css'
import { monaco } from './editor';

const queryService = require('./service/queryService')
const solutionResultModule = require('./modules/solutionResultModule')

const theoryField = document.querySelector("#theory");
const queryField = document.querySelector("#query");
const solutionsList = document.querySelector("#solutions");


let theoryEditor = monaco.editor.create(theoryField, {
    value: [
        'father_child(tom, sally).',
        'father_child(tom, erica).',
        'father_child(mike, tom).',
        '',
        'sibling(X, Y) :- parent_child(Z, X), parent_child(Z, Y).',
        '',
        'parent_child(X, Y) :- father_child(X, Y).',
        'parent_child(X, Y) :- mother_child(X, Y).'
    ].join('\n'),
    language: 'tuprolog',
    minimap: {
        enabled: false
    }
});


let queryEditor = monaco.editor.create(queryField, {
    value: 'sibling(sally,Y)',
    language: 'tuprolog',
    minimap: {
        enabled: false
    }
});


function startup() {
    const resultModule = solutionResultModule.init(solutionsList);
    setListeners(resultModule);
    showBody();
}

function setListeners(resultModule) {

    document.querySelector("button.solve")
    .addEventListener("click", () => {
        try{
            const { i, query } = queryService.solve(theoryEditor.getValue(), queryEditor.getValue());
            resultModule.printSolution(i, query);
        }
        catch(error){
            alert(`${error.name.toUpperCase()} \n${error.message}`);
        }

    });

    document
    .querySelector("#inputFile")
    .addEventListener("change", e =>
        readFile(e.target.files[0], text => theoryEditor.setValue(text))
    );

    document.querySelector("#colorMode .colorSwitch")
    .addEventListener("change", (e) => {
        if (e.target.checked) {
            document.body.classList.add('dark');
            monaco.editor.setTheme('vs-dark');
        } else {
            document.body.classList.remove('dark');
            monaco.editor.setTheme('vs');
        }
    });
};

function readFile(file, cb) {
    var reader = new FileReader();
    reader.onload = (function (reader) {
        return () => cb(reader.result);
    })(reader);
    //if (file.type === 'text/plain') {
    reader.readAsText(file);
    /*} else {
      alert("formato file non ammesso")
    }*/
};

function showBody() {
    document.querySelectorAll('.loading').forEach(
        e => e.classList.remove('loading')
    )
}

startup();

