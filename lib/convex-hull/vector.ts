import {IPoint} from './point'

export interface IVector {
  x:number;
  y:number;
}

export default class Vector implements IVector {
  x:number = 0;
  y:number = 0;
  constructor (tail:IPoint, head:IPoint) {
    this.x = head.x - tail.x;
    this.y = head.y - tail.y;
  }
}
