function queryService() {

    const common = require('../common.js')

    const ClassicSolverFactory = common.tuprolog.classic.ClassicSolverFactory;

    function solverOf(staticKb) {
        return ClassicSolverFactory.solverWithDefaultBuiltinsAndStaticKB(
            staticKb
        );
    }

    function solve(theoryText, queryText) {
        if (/^\s*$/.test(queryText)) {
            throw {
                name: "Query error",
                message: "Query is a mandatory field."
            }
        }

        const query = tryBlock(() => common.tuprolog.core.parsing.parseStringAsStruct(queryText), "Query Error");
        const theory = tryBlock(() => common.tuprolog.theory.parsing.parseAsTheory(theoryText), "Theory Error");
        const solver = solverOf(theory);
        const solutions = tryBlock(() => solver.solve(query), "Solve Error");
        const i = solutions.iterator();
        return { i, query };

    }

    function tryBlock(fun, name) {
        try {
            return fun();
        } catch (err) {
            throw {
                name,
                message: formatErrorMessage(err)
            }
        }
    }

    function formatErrorMessage(err) {
        let message = '';
        message += err.name ? `${err.name}\n` : '';
        message += err.message ? `${err.message}\n` : '';
        message += err.line ? `at line ${err.line}` : '';
        return message
    }


    return { solve }
}

module.exports = queryService()
