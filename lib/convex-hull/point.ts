export interface IPoint {
  x : number;
  y : number;
}

export class Point implements IPoint {
  x : number;
  y : number;
  constructor (pointData : Array<number>) {
    this.x = pointData[0];
    this.y = pointData[1];
  }

  static crossProduct (a:IPoint, b:IPoint) : number {
    return a.x * b.y - a.y * b.x;
  }

  static squareDistance (a:IPoint, b:IPoint) : number {
    const xD : number = a.x - b.x;
    const yD : number = a.y - b.y;
    return xD * xD + yD * yD;
  }
}
