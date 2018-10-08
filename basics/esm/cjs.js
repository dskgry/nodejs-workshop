const {doStuff} = require('./myServiceCjs');

doStuff();


//import {doMjsStuff} from './myServiceMjs';    //this will throw

//const {doMjsStuff} = require('./myServiceMjs.mjs');  //this will throw

//import('./myServiceMjs.mjs').then(module => module.doMjsStuff());  this is ok
