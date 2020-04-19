(function() {
  const ClassicSolverFactory = tuprolog.classic.ClassicSolverFactory;
  const theoryField = document.querySelector("#theory");
  const queryField = document.querySelector("#query");
  const solutionsList = document.querySelector("#solutions");

  function startup() {
    setListeners();
  }

  function solverOf(staticKb) {
    return ClassicSolverFactory.solverWithDefaultBuiltins(
      ClassicSolverFactory.defaultLibraries,
      ClassicSolverFactory.defaultFlags,
      staticKb
    );
  }

  function setListeners() {
    const buttons = document.querySelectorAll("button.solve");
    buttons.forEach(e => e.addEventListener("click", solve));
    const clearSolutionButton = document.querySelector("button.clearSolutions");
    if (clearSolutionButton)
      clearSolutionButton.addEventListener(
        "click",
        () => (solutionsList.innerHTML = "")
      );
      document
      .querySelector("#inputFile")
      .addEventListener("change", e =>
        readFile(e.target.files[0], text => (theoryField.innerText = text))
      );
  };

  function readFile(file, cb){
    var reader = new FileReader();
    reader.onload = (function(reader) {
      return () => cb(reader.result);
    })(reader);

    reader.readAsText(file);
  };

  function solve() {
    if (/^\s*$/.test(queryField.value)) {
      alert("Missing query!");
      return;
    }

    const query = tuprolog.core.parsing.parseStringAsStruct(queryField.value);
    const theory = tuprolog.theory.parsing.parseAsClauseDatabase(theoryField.value);
    const solver = solverOf(theory);
    const solutions = solver.solve(query);
    const i = solutions.iterator();
    SolutionResult(i,solutionsList,query)
  }

  function SolutionResult(iterable, parentHtml, query) {

    function prepareDom(){
      const list = document.createElement("ul");
      const solutionQuery = document.createElement("span");
      const nextButton = document.createElement("button")
      nextButton.innerText = "Next"
      nextButton.addEventListener('click', ()=>printNext(list))
      solutionQuery.innerText = query
      const solutionContainer = document.createElement("div");
      solutionContainer.className = "solutionResultWrapper"
      solutionContainer.appendChild(solutionQuery)
      solutionContainer.appendChild(nextButton)
      solutionContainer.appendChild(list)
      parentHtml.appendChild(solutionContainer)
      return list;
    }


    function addDomSolution(sol, solutionList) {
      let element = document.createElement("li");
      element.innerText = sol;
      solutionList.appendChild(element);
    }

    function printNext(list) {
      if (iterable.hasNext()) addDomSolution(iterable.next(), list);
    }

    printNext(prepareDom());
  }

  startup();
})();
