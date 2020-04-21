
function queryModule(theoryField, queryField, solveCallback) {

    const common = require('../common.js')

    const ClassicSolverFactory = common.tuprolog.classic.ClassicSolverFactory;

    function solverOf(staticKb) {
        return ClassicSolverFactory.solverWithDefaultBuiltins(
            ClassicSolverFactory.defaultLibraries,
            ClassicSolverFactory.defaultFlags,
            staticKb
        );
    }

    function solve() {
        if (/^\s*$/.test(queryField.value)) {
            alert("Missing query!");
            return;
        }

        const query = common.tuprolog.core.parsing.parseStringAsStruct(queryField.value);
        const theory = common.tuprolog.theory.parsing.parseAsClauseDatabase(theoryField.value);
        const solver = solverOf(theory);
        const solutions = solver.solve(query);
        const i = solutions.iterator();
        solveCallback(i, query)
    }

    function setListeners() {
        const solveQuery = document.querySelector("button.solve");
        solveQuery.addEventListener("click", () => solve());
    };

    setListeners();
}

module.exports = queryModule
