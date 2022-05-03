"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlusTheme = void 0;
const react_1 = require("react");
const components_1 = require("../../components");
function usePlusTheme() {
    return (0, react_1.useContext)(components_1.PlusContext).theme;
}
exports.usePlusTheme = usePlusTheme;
