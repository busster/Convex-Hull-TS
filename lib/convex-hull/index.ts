import { Point, IPoint } from './point'
import Stack from '../utils/stack'

export default class ConvexHull {
  points: Array<IPoint>;
  convexHull: Stack<IPoint> = new Stack();

  constructor (pointsData : Array<Array<number>>) {
    this.points = pointsData.map(p => new Point(p));
  }

  computeConvexHull () : Array<IPoint> | undefined {
    if (this.points.length < 3) return undefined;
    const rootPoint = this.findRootPoint();

    this.removePoint(rootPoint);

    const orientationCalculator : Function = this.calculatePolarAngle(rootPoint);

    // Sort by orientation,
    //  and if they are the same,
    //  by distance moving closer points to the front of the list
    this.points.sort((a:IPoint, b:IPoint) => {
      const orientation:number = orientationCalculator(a, b);
      if (orientation === 0) return Point.squareDistance(rootPoint, a) >= Point.squareDistance(rootPoint, b) ? 1 : -1;
      return orientation;
    });

    // Remove Colinear Points
    const tempPoints : Array<IPoint> = [rootPoint];
    for (let i=0; i<this.points.length - 1; i++) {
      let tempA:IPoint = this.points[i]
      let tempB:IPoint = this.points[i + 1]
      let angle:number = orientationCalculator(tempA, tempB);
      if (angle !== 0) tempPoints.push(tempA);
      if (i + 1 === this.points.length -1) tempPoints.push(tempB);
    }
    this.points = tempPoints;

    // No need to compute convex hull if we don't have at least 3 points
    if (this.points.length < 3) return this.points;

    this.convexHull.push(this.points[0]);
    this.convexHull.push(this.points[1]);
    this.convexHull.push(this.points[2]);

    for (let i=3; i<this.points.length; i++) {
      while (this.calculatePolarAngle(this.convexHull.nextToTop())(this.convexHull.top(), this.points[i]) >= 0) {
        this.convexHull.pop()
      }
      this.convexHull.push(this.points[i]);
    }

    return this.convexHull.toArray();
  }

  findRootPoint () : IPoint {
    let point:IPoint = this.points[0];
    for (let i = 1; i < this.points.length; i++) {
      let pointToConsider = this.points[i];
      if (pointToConsider.y < point.y || (pointToConsider.y === point.y && pointToConsider.x < point.x)) {
        point = pointToConsider;
      }
    }
    return point;
  }

  calculatePolarAngle (root:IPoint | undefined) : Function {
    return (a:IPoint, b:IPoint) : number | undefined => {
      if (root === undefined) return undefined
      return (a.y - root.y) * (b.x - a.x) - (a.x - root.x) * (b.y - a.y)  
    }
  }

  removePoint (point:IPoint) : void {
    const index:number = this.points.reduce((acc, next, index) => {
      if (acc === -1 && next.x === point.x && next.y === point.y) return index
      return acc
    }, -1)
    this.points.splice(index,1)
  }
}
