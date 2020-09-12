var expect = require('chai').expect

var common = require('../../app/common.js')

describe('Common', function () {

    it('parseAsTheory should fail', function(done) {
        function throwsWithNoArgs() {
            common.tuprolog.theory.parsing.parseAsTheory(' mother_child(trude, sally)')
        }
        expect(throwsWithNoArgs).to.throw
        done()
        });
})