"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColumns = void 0;
const hooks_1 = require("../../../hooks");
const utils_1 = require("../utils");
function useColumns(model, columns = []) {
    const locale = (0, hooks_1.usePlusLocale)();
    return utils_1.ColumnUtils.parse(model, columns, locale.language);
}
exports.useColumns = useColumns;
