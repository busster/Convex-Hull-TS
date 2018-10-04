export default class Stack<T> {
  _s: T[] = [];
  push (val: T) {
    this._s.push(val);
  }

  pop (): T | undefined {
    return this._s.pop();
  }

  top () : T | undefined {
    return this._s[this._s.length - 1]
  }
  
  nextToTop () : T | undefined {
    if (this._s.length < 2) return undefined
    return this._s[this._s.length - 2]
  }

  toArray () : Array<T> {
    return this._s;
  }
}