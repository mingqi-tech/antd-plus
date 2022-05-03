"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlusTable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_1 = __importDefault(require("lodash"));
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const setting_popover_1 = require("./setting-popover");
const use_columns_1 = require("./use-columns");
const utils_1 = require("./utils");
require("./styles/index.less");
function PlusTable(props) {
    const { model, columns = [], size, beforeTools, onReload, afterTools, ...rest } = props;
    const columnsObj = (0, use_columns_1.useColumns)(model, columns);
    const [colSorts, setColSorts] = (0, react_1.useState)(lodash_1.default.cloneDeep(columnsObj));
    return ((0, jsx_runtime_1.jsxs)(antd_1.Card, { className: "plus-table", children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { className: "plus-table-tools", align: "middle", justify: "space-between", children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: beforeTools }) }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [afterTools, typeof onReload === 'function' && ((0, jsx_runtime_1.jsx)(antd_1.Button, { icon: (0, jsx_runtime_1.jsx)(icons_1.ReloadOutlined, {}), onClick: onReload })), (0, jsx_runtime_1.jsx)(setting_popover_1.SettingPopover, { columns: colSorts, onChange: (v) => setColSorts(v), onReset: () => setColSorts(lodash_1.default.cloneDeep(columnsObj)) })] })] }), (0, jsx_runtime_1.jsx)(antd_1.Table, { size: size || 'small', columns: utils_1.ColumnUtils.filter(colSorts).map((x) => {
                    const find = columnsObj.find((o) => o.dataIndex === x.dataIndex);
                    return {
                        ...x,
                        ...find,
                        hidden: x.hidden,
                    };
                }), rowKey: "id", ...rest })] }));
}
exports.PlusTable = PlusTable;
