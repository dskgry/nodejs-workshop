import { doMjsStuff } from './myServiceMjs';

//const myServiceCJS = require('./myServiceCjs');     this will throw
//import {doStuff} from './myServiceCjs';   this will throw

//import myServiceCJS from './myServiceCjs';  this is ok
//myServiceCJS.doStuff();

doMjsStuff();