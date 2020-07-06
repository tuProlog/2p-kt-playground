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
            alert("Missing query!");
            return{i:null, query:null, error:"error"};
        }

        try{
            const query = common.tuprolog.core.parsing.parseStringAsStruct(queryText);
            const theory = common.tuprolog.theory.parsing.parseAsTheory(theoryText);
            const solver = solverOf(theory);
            const solutions = solver.solve(query);
            const i = solutions.iterator();
            return{i, query};
        }catch(err){
            alert(`ERRORE! \n ${err.name} \n ${err.message}`)
            return{i:null, query:null, error:"error"};
        }
        
        
    }

    return {solve}
}

module.exports = queryService()
