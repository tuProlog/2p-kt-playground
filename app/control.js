import '../assets/style.css'
import {monaco} from './editor';

const queryService = require('./service/queryService')
const solutionResultModule = require('./modules/solutionResultModule')

const theoryField = document.querySelector("#theory");
const queryField = document.querySelector("#query");
const solutionsList = document.querySelector("#solutions");


var theoryEditor = monaco.editor.create(theoryField, {
	value: [
		'father_child(tom, sally).',
            'father_child(tom, erica).',
            'father_child(mike, tom).',
             '',   
            'sibling(X, Y) :- parent_child(Z, X), parent_child(Z, Y).',
                
            'parent_child(X, Y) :- father_child(X, Y).',
            'parent_child(X, Y) :- mother_child(X, Y).'
	].join('\n'),
	language: 'python',
	minimap : {
		enabled : false
	}
});


var queryEditor = monaco.editor.create(queryField, {
	value: 'sibling(sally,Y)',
	language: 'python',
	minimap : {
		enabled : false
	}
});

function startup() {
  setListeners();
  solutionResultModule.init(solutionsList)
  showBody()
}

function setListeners() {
  document
    .querySelector("#inputFile")
    .addEventListener("change", e =>
      readFile(e.target.files[0], text => theoryEditor.setValue(text))
    );

  const solveQuery = document.querySelector("button.solve");
  solveQuery.addEventListener("click", () => {

    const { i, query, error } = queryService.solve(theoryEditor.getValue(), queryEditor.getValue())
    if (error)
      return;
    solutionResultModule.printSolution(i, query)
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

function showBody(){
  document.querySelectorAll('.loading').forEach(
    e => e.classList.remove('loading')
  )
}

startup();

