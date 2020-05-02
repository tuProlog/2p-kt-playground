var assert = require('assert');

var queryService = require('../app/service/queryService.js')

var baseTheoryText=`mother_child(trude, sally).
            
father_child(tom, sally).
father_child(tom, erica).
father_child(mike, tom).
    
sibling(X, Y)      :- parent_child(Z, X), parent_child(Z, Y), X >= Y.
    
parent_child(X, Y) :- father_child(X, Y).
parent_child(X, Y) :- mother_child(X, Y).`;


describe('Solve', function() {

  describe('#indexOf()', function() {
    const inputQuery = `siblings(sally, Y)`
      var {i,query} = queryService.solve(baseTheoryText, inputQuery)

    it('result should have next', function() {
      assert.equal(i.hasNext(), true);
    });

    it('result should have 1 result', function() {
      var index = 0;
      while(i.hasNext()){
        i.next();
        index++
      }
        assert.equal(index, 1);
    });

    /*it('query should be equal to submitted', function() {
      assert.equal(query.toString(), inputQuery);
    });*/
  });
});