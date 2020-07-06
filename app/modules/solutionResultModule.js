function SolutionResultModule() {

  let {tuprolog} = require('../common');
  let TermFormatter = tuprolog.core.TermFormatter.Companion;
  let parentHtml;
  let queryCounter=1;

  function init(parentNode){
    //const clearALL = document.createElement("button")
    //clearALL.classList.add("clearSolutions")
    //clearALL.innerText= "Clear All"
    //clearALL.addEventListener("click", () => solutionBox.innerHTML="")
    const solutionBox = document.createElement("div")
    solutionBox.classList.add("output")
    //parentNode.prepend(clearALL)
    parentNode.appendChild(solutionBox)
    parentHtml = solutionBox
  }


  function printSolution(iterator, query) {
    const solutionContainer = document.createElement("div")
    solutionContainer.className = "solutionResultWrapper"
    const list = document.createElement("ul")
    const nextButton = document.createElement("button")
    nextButton.innerText = "Next"
    nextButton.addEventListener('click', () => printNext(iterator, list, nextButton))
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "X"
    deleteButton.addEventListener('click', ()=>solutionContainer.remove())
    const solutionQuery = document.createElement("span")
    solutionQuery.innerText = `${queryCounter} - ${query}`
    solutionContainer.appendChild(solutionQuery)
    solutionContainer.appendChild(nextButton)
    solutionContainer.appendChild(deleteButton)
    solutionContainer.appendChild(list)
    parentHtml.appendChild(solutionContainer)
    queryCounter++;
    return list;
  }


  function addDomSolution(sol, solutionList) {
    let element = document.createElement("li");
    let text =  '';
    if (sol.isYes) {
      text = "Yes : "+TermFormatter.prettyExpressionsPrettyVariablesDefaultOperators().format(sol.solvedQuery)
      
    }else if (sol.isNo){
       text = "No"
    }else {
      text = "Halt : "+sol.exception.toString()
    }

    element.innerText = text
    solutionList.appendChild(element);
  }

  function printNext(iterator,list, nextButton) {
    if (iterator.hasNext())
      addDomSolution(iterator.next(), list);
    if (!iterator.hasNext())
      nextButton.disabled = true;
  }

  return{init, printSolution}
}

module.exports = SolutionResultModule()