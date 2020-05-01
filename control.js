(function () {
  const queryModule = require('./modules/queryModule')
  const solutionResultModule = require('./modules/solutionResultModule')

  const theoryField = document.querySelector("#theory");
  const queryField = document.querySelector("#query");
  const solutionsList = document.querySelector("#solutions");

  function startup() {
    setListeners();
  }

  function solveCallback(iterator, query) {
    solutionResultModule(iterator, solutionsList, query)
  }

  function setListeners() {
    document
      .querySelector("#inputFile")
      .addEventListener("change", e =>
        readFile(e.target.files[0], text => (theoryField.innerText = text))
      );

      const solveQuery = document.querySelector("button.solve");
    solveQuery.addEventListener("click", () => queryModule.solve(theoryField.value, queryField.value, solveCallback));
  };

  function readFile(file, cb) {
    var reader = new FileReader();
    reader.onload = (function (reader) {
      return () => cb(reader.result);
    })(reader);

    if(file.type === 'text/plain'){
      reader.readAsText(file);
    }else{
      alert("formato file non ammesso")
    }
      
  };

  startup();
})();
