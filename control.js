const ClassicSolverFactory = tuprolog.classic.ClassicSolverFactory;

function solverOf(staticKb) {
    return ClassicSolverFactory.solverWithDefaultBuiltins(
        ClassicSolverFactory.defaultLibraries,
        ClassicSolverFactory.defaultFlags,
        staticKb
    );
}

function solve() {
    const theoryField = $("#theory");
    const queryField = $("#query");
    const solutionsList = $("#solutions");

    if (/^\s*$/.test(queryField.val())) {
        alert("Missing query!");
        return;
    }

    const query = tuprolog.core.parsing.parseStringAsStruct(queryField.val());
    const theory = tuprolog.theory.parsing.parseAsClauseDatabase(theoryField.text());
    const solver = solverOf(theory);

    const solutions = solver.solve(query);
    const i = solutions.iterator();

    while (i.hasNext()) {
        const sol = i.next();
        alert(sol.toString());
    }
}