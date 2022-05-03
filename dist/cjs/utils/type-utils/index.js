"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeUtils = void 0;
class TypeUtils {
    static isPromise(o) {
        return (o instanceof Promise ||
            (typeof o === 'object' &&
                o !== null &&
                typeof o.then === 'function' &&
                typeof o.catch === 'function' &&
                typeof o.finally === 'function'));
    }
}
exports.TypeUtils = TypeUtils;
