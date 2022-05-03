"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlusLocale = void 0;
const react_1 = require("react");
const components_1 = require("../../components");
const locales_1 = require("../../locales");
function usePlusLocale() {
    return ((0, react_1.useContext)(components_1.PlusContext).locale || locales_1.zh_CN);
}
exports.usePlusLocale = usePlusLocale;
