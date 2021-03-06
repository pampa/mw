/*
 * simple kick snare hh pattern
 * midi clock from Novation Circuit via x0x 
 * to trigger Circuits drums
 */

const midi    = require("../midi");
const circuit = require("../circuit");

const div    = new (require("../divider"))(); 
const x0x    = new (require("../x0x"))();

const clock  = new midi.Input("Circuit"); 
const output = new midi.Output("Circuit"); 

clock.on("start", () => { div.start(); });
clock.on("stop",  () => { div.stop();  });
clock.on("clock", () => { 
    div.step();
    output.step();
});

const kick  = new circuit.Drum1(output);
const snare = new circuit.Drum2(output);
const hat   = new circuit.Drum3(output);
const cym   = new circuit.Drum4(output);

x0x.pat("kick",  "| k--- k--- k--- k--- |", () => {  kick.trig(); });
x0x.pat("snare", "| ---- s--- ---- s--- |", () => { snare.trig(); });
x0x.pat("hat",   "| h-h- h-h- h-h- h--- |", () => {   hat.trig(); });
x0x.pat("cym",   "| ---- ---- ---- --c- |", () => {   cym.trig(); });

div.on(6, () => { x0x.step(); });
