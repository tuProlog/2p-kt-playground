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

  const setListeners = () => {
    const buttons = document.querySelectorAll("button.solve");
    buttons.forEach(e => e.addEventListener("click", solve));
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

    while (i.hasNext()) {
      const sol = i.next();
      alert(sol.toString());
    }
  }
  startup();
})();
