function SolutionResultModule() {

    let { tuprolog } = require('../common');
    let TermFormatter = tuprolog.core.TermFormatter.Companion;
    const formatter = () => TermFormatter.prettyExpressionsPrettyVariablesDefaultOperators();
    let parentHtml;
    let queryCounter = 1;

    function init(parentNode) {
        //const clearALL = document.createElement("button")
        //clearALL.classList.add("clearSolutions")
        //clearALL.innerText= "Clear All"
        //clearALL.addEventListener("click", () => solutionBox.innerHTML="")
        const solutionBox = document.createElement("div");
        solutionBox.classList.add("output");
        //parentNode.prepend(clearALL)
        parentNode.appendChild(solutionBox);
        parentHtml = solutionBox;
        return { printSolution };
    }


    function printSolution(iterator, query) {
        const solutionContainer = document.createElement("div");
        solutionContainer.className = "solutionResultWrapper";
        const list = document.createElement("ul");
        const nextButton = document.createElement("button");
        nextButton.innerText = "Next";
        nextButton.addEventListener('click', () => printNext(iterator, list, nextButton));
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        deleteButton.addEventListener('click', () => solutionContainer.remove());
        const solutionQuery = document.createElement("span");
        solutionQuery.innerText = `${queryCounter} - ${formatter().format(query)}`;
        solutionContainer.appendChild(solutionQuery);
        solutionContainer.appendChild(nextButton);
        solutionContainer.appendChild(deleteButton);
        solutionContainer.appendChild(list);
        parentHtml.appendChild(solutionContainer);
        queryCounter++;
        return list;
    }


    function addDomSolution(sol, solutionList) {
        let element = document.createElement("li");
        if (sol.isYes) {
            element = printPrettySolutions(sol);

        } else if (sol.isNo) {
            element.innerText = "No";
        } else {
            element.innerText = "Halt : " + sol.exception.toString();
        }
        solutionList.appendChild(element);
    }

    function printPrettySolutions(sol) {
        let element = document.createElement("li");
        element.innerText = formatter().format(sol.solvedQuery);
        if (!sol.substitution.isEmpty()) {
            let list = document.createElement('ul');
            let solutions = sol.substitution.entries.toJSON().reduce((p, c) => {
                let li = document.createElement('li');
                li.innerText = `${formatter().format(c.key)} : ${formatter().format(c.value)}`;
                p.appendChild(li);
                return p;
            }, list);
            element.appendChild(solutions);
        }
        return element
    }

    function printNext(iterator, list, nextButton) {
        if (iterator.hasNext())
            addDomSolution(iterator.next(), list);

        nextButton.disabled = !iterator.hasNext();
    }

    return { init }
}

module.exports = SolutionResultModule()