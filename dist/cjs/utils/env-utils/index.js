"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvUtils = void 0;
class EnvUtils {
    static isDev() {
        return process.env.NODE_ENV === 'development';
    }
    static isProd() {
        return process.env.NODE_ENV === 'production';
    }
}
exports.EnvUtils = EnvUtils;
