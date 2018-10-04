define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Vector {
        constructor(tail, head) {
            this.x = 0;
            this.y = 0;
            this.x = head.x - tail.x;
            this.y = head.y - tail.y;
        }
    }
    exports.default = Vector;
});
