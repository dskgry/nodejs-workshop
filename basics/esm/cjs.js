const {doStuff} = require('./myServiceCjs');

doStuff();

//import('./myServiceMjs.mjs').then(module => module.doMjsStuff());  OK

//import {doMjsStuff} from './myServiceMjs';   NOT OK

//const {doMjsStuff} = require('./myServiceMjs.mjs');  NOT OK


