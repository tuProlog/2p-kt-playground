(function () {
  const queryModule = require('./modules/queryModule')
  const solutionResultModule = require('./modules/solutionResultModule')

  const theoryField = document.querySelector("#theory");
  const queryField = document.querySelector("#query");
  const solutionsList = document.querySelector("#solutions");

  function startup() {
    setListeners();
    queryModule(theoryField, queryField, solveCallback)
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
