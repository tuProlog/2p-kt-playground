const kotlin = require("kotlin").kotlin;
const ktmath = require("kt-math").org.gciatto.kt.math;
const core = require("@tuprolog/2p-core").it.unibo.tuprolog.core;
const unify = require("@tuprolog/2p-unify").it.unibo.tuprolog.unify;
const solve = require("@tuprolog/2p-solve").it.unibo.tuprolog.solve;
const classic = require("@tuprolog/2p-solve-classic").it.unibo.tuprolog.solve;
const theory = require("@tuprolog/2p-theory").it.unibo.tuprolog.theory;
core.parsing = require("@tuprolog/2p-parser-core").it.unibo.tuprolog.core.parsing;
theory.parsing = require("@tuprolog/2p-parser-theory").it.unibo.tuprolog.theory.parsing;

const tuprolog = {
    "core": core,
    "unify": unify,
    "theory": theory,
    "solve": solve,
    "classic": classic
};

window.kotlin = kotlin;
window.ktmath = ktmath;
window.tuprolog = tuprolog;
window["2p"] = tuprolog;
window.println = function (x) {
    console.log(x.toString());
};