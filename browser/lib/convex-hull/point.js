define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Point {
        constructor(pointData) {
            this.x = pointData[0];
            this.y = pointData[1];
        }
        static crossProduct(a, b) {
            return a.x * b.y - a.y * b.x;
        }
        static squareDistance(a, b) {
            const xD = a.x - b.x;
            const yD = a.y - b.y;
            return xD * xD + yD * yD;
        }
    }
    exports.Point = Point;
});
