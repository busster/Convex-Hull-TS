"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const point_1 = require("./point");
const stack_1 = __importDefault(require("../utils/stack"));
class ConvexHull {
    constructor(pointsData) {
        this.convexHull = new stack_1.default();
        this.points = pointsData.map(p => new point_1.Point(p));
    }
    computeConvexHull() {
        if (this.points.length < 3)
            return undefined;
        const rootPoint = this.findRootPoint();
        this.removePoint(rootPoint);
        const orientationCalculator = this.calculatePolarAngle(rootPoint);
        // Sort by orientation,
        //  and if they are the same,
        //  by distance moving closer points to the front of the list
        this.points.sort((a, b) => {
            const orientation = orientationCalculator(a, b);
            if (orientation === 0)
                return point_1.Point.squareDistance(rootPoint, a) >= point_1.Point.squareDistance(rootPoint, b) ? 1 : -1;
            return orientation;
        });
        // Remove Colinear Points
        const tempPoints = [rootPoint];
        for (let i = 0; i < this.points.length - 1; i++) {
            let tempA = this.points[i];
            let tempB = this.points[i + 1];
            let angle = orientationCalculator(tempA, tempB);
            if (angle !== 0)
                tempPoints.push(tempA);
            if (i + 1 === this.points.length - 1)
                tempPoints.push(tempB);
        }
        this.points = tempPoints;
        // No need to compute convex hull if we don't have at least 3 points
        if (this.points.length < 3)
            return this.points;
        this.convexHull.push(this.points[0]);
        this.convexHull.push(this.points[1]);
        this.convexHull.push(this.points[2]);
        for (let i = 3; i < this.points.length; i++) {
            while (this.calculatePolarAngle(this.convexHull.nextToTop())(this.convexHull.top(), this.points[i]) >= 0) {
                this.convexHull.pop();
            }
            this.convexHull.push(this.points[i]);
        }
        return this.convexHull.toArray();
    }
    findRootPoint() {
        let point = this.points[0];
        for (let i = 1; i < this.points.length; i++) {
            let pointToConsider = this.points[i];
            if (pointToConsider.y < point.y || (pointToConsider.y === point.y && pointToConsider.x < point.x)) {
                point = pointToConsider;
            }
        }
        return point;
    }
    calculatePolarAngle(root) {
        return (a, b) => {
            if (root === undefined)
                return undefined;
            return (a.y - root.y) * (b.x - a.x) - (a.x - root.x) * (b.y - a.y);
        };
    }
    removePoint(point) {
        const index = this.points.reduce((acc, next, index) => {
            if (acc === -1 && next.x === point.x && next.y === point.y)
                return index;
            return acc;
        }, -1);
        this.points.splice(index, 1);
    }
}
exports.default = ConvexHull;
//# sourceMappingURL=index.js.map