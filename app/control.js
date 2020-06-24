import './style.css'
(function () {

  const queryService = require('./service/queryService')
  const solutionResultModule = require('./modules/solutionResultModule')

  const theoryField = document.querySelector("#theory");
  const queryField = document.querySelector("#query");
  const solutionsList = document.querySelector("#solutions");

  function startup() {
    setListeners();
    solutionResultModule.init(solutionsList)
  }

  function setListeners() {
    document
    .querySelector("#inputFile")
      .addEventListener("change", e =>
        readFile(e.target.files[0], text => theoryField.value= text)
      );

    const solveQuery = document.querySelector("button.solve");
    solveQuery.addEventListener("click", () => {
      
      const { i, query, error } = queryService.solve(theoryField.value, queryField.value)
      if(error)
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

  startup();
})();
