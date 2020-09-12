
const assert = require('assert');

const queryService = require('../../app/service/queryService.js')

const expect = require('chai').expect

const baseTheoryText=`
    mother_child(trude, sally).
    mother_child(emily, jim).
            
    father_child(tom, sally).
    father_child(tom, erica).
    father_child(mike, tom).
    father_child(mike, jim).
    father_child(mike, marc).
    
    sibling(X, Y)      :- parent_child(Z, X), parent_child(Z, Y), X \\= Y.
        
    parent_child(X, Y) :- father_child(X, Y).
    parent_child(X, Y) :- mother_child(X, Y).`;

describe('queryService', function() {

    it('should fail if incorrect theory', function(done) {
      const inputQuery = `sibling(sally, Y)`
      const theory = `mother_child(trude, sally)`
      function throwsWithNoArgs() {
        queryService.solve(theory, inputQuery)
      }
      expect(throwsWithNoArgs).to.throw
      done()
      });

    it('should fail if no query', function(done) {
        const inputQuery = ``
        function throwsWithNoArgs() {
          queryService.solve(baseTheoryText, inputQuery)
        }
        expect(throwsWithNoArgs).to.throw('Query is a mandatory field.')
        done()
        });
  
    describe('Solution$Yes', function() {
      const inputQuery = `sibling(sally, Y)`
        
      it('result should have next', function() {
        const {i} = queryService.solve(baseTheoryText, inputQuery)
        assert.equal(i.hasNext(), true);
      });
  
      
      it('result should have 1 Yes result', function() {
        const {i} = queryService.solve(baseTheoryText, inputQuery)
        let index = 0;
        while(i.hasNext()){
          const result = i.next();
          if(result.isYes) index++
        }
          assert.equal(index, 1);
      });
  
      it('result should have 2 Yes result', function() {
        const currentQuery = `sibling(tom, Y)`
        const {i} = queryService.solve(baseTheoryText, currentQuery)
        let index = 0;
        while(i.hasNext()){
          const result = i.next();
          if(result.isYes) index++
        }
          assert.equal(index, 2);
      });
    });
  
    describe('Solution$No', function() {
      const inputQuery = `sibling(jennifer, Y)`
  
      it('result should have next', function() {
        const {i} = queryService.solve(baseTheoryText, inputQuery)
        assert.equal(i.hasNext(), true);
      });
  
      it('result should have 1 No result and no Others', function() {
        const {i} = queryService.solve(baseTheoryText, inputQuery)
        let noCounter = 0;
        let othersCounter = 0;
        while(i.hasNext()){
          const result = i.next();
          result.isNo ? noCounter++ : othersCounter++
        }
          assert.equal(noCounter, 1);
          assert.equal(othersCounter, 0);
      });
    });
  
    describe('Solution$Halt', function() {
      const inputQuery = `halt`
  
      it('result should have next', function() {
        const {i} = queryService.solve("", inputQuery)
        assert.equal(i.hasNext(), true);
      });
  
      it('result should have 1 Halt result and no Others', function() {
        const {i} = queryService.solve("", inputQuery)
        let haltCounter = 0;
        let othersCounter = 0;
        while(i.hasNext()){
          const result = i.next();
          result.isHalt ? haltCounter++ : othersCounter++
        }
          assert.equal(haltCounter, 1);
          assert.equal(othersCounter, 0);
      });
  
    })
  
  });