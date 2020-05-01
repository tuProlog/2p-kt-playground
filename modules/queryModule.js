
function queryModule() {

    const common = require('../common.js')

    const ClassicSolverFactory = common.tuprolog.classic.ClassicSolverFactory;

    function solverOf(staticKb) {
        return ClassicSolverFactory.solverWithDefaultBuiltins(
            ClassicSolverFactory.defaultLibraries,
            ClassicSolverFactory.defaultFlags,
            staticKb
        );
    }

    function solve(theoryText, queryText, solveCallback) {
        if (/^\s*$/.test(queryText)) {
            alert("Missing query!");
            return;
        }

        const query = common.tuprolog.core.parsing.parseStringAsStruct(queryText);
        const theory = common.tuprolog.theory.parsing.parseAsClauseDatabase(theoryText);
        const solver = solverOf(theory);
        const solutions = solver.solve(query);
        const i = solutions.iterator();
        solveCallback(i, query);
        
    }

    return {solve}
}

module.exports = queryModule()
