"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stack {
    constructor() {
        this._s = [];
    }
    push(val) {
        this._s.push(val);
    }
    pop() {
        return this._s.pop();
    }
    top() {
        return this._s[this._s.length - 1];
    }
    nextToTop() {
        if (this._s.length < 2)
            return undefined;
        return this._s[this._s.length - 2];
    }
    toArray() {
        return this._s;
    }
}
exports.default = Stack;
//# sourceMappingURL=stack.js.map