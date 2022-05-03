"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocaleUtils = void 0;
const class_mirror_1 = require("@quick-toolkit/class-mirror");
const http_1 = require("@quick-toolkit/http");
class LocaleUtils {
    static getModelLocale(model, language) {
        const classMirror = class_mirror_1.ClassMirror.reflect(model);
        const decorates = classMirror.getAllDecorates(http_1.ApiRequestDecorate);
        let title = null;
        let description = null;
        decorates.find((decorate) => {
            const { metadata } = decorate;
            const locales = metadata.locales;
            if (locales && locales[language]) {
                title = locales[language] || null;
                if (!description && metadata.description) {
                    description = metadata.description;
                }
                return true;
            }
            return false;
        });
        return title || description;
    }
}
exports.LocaleUtils = LocaleUtils;
