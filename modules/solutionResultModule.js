function SolutionResultModule(iterable, parentHtml, query) {

  function setListeners() {
    const clearSolutionButton = document.querySelector("button.clearSolutions");
    if (clearSolutionButton)
      clearSolutionButton.addEventListener(
        "click",
        () => (parentHtml.innerHTML = "")
      );
  }

  function prepareDom() {
    const list = document.createElement("ul");
    const solutionQuery = document.createElement("span");
    const nextButton = document.createElement("button")
    nextButton.innerText = "Next"
    nextButton.addEventListener('click', () => printNext(list))
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

  setListeners();
  printNext(prepareDom());
}

module.exports = SolutionResultModule