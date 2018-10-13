import * as PIXI from 'pixi.js';
import {User} from './models/user.model';

const q = new User();
const sd = new PIXI.filters.BlurFilter();

console.log(q);
console.log(sd.blur);
console.log('pixi.js =>>>>', sd);
