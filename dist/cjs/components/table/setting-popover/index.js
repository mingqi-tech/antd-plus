"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingPopover = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const react_1 = require("react");
const utils_1 = require("../utils");
const hooks_1 = require("../../../hooks");
const locales = __importStar(require("../locales"));
function SettingPopover(props) {
    const { columns, onChange, onReset } = props;
    const targetKey = (0, react_1.useRef)();
    const checkedKeys = utils_1.ColumnUtils.getCheckedKeys(columns);
    const locale = (0, hooks_1.usePlusLocale)();
    const LANGUAGE = (0, react_1.useMemo)(() => locales[locale.language], [locale.language]);
    return ((0, jsx_runtime_1.jsx)(antd_1.Popover, { title: (0, jsx_runtime_1.jsxs)(antd_1.Row, { justify: "space-between", align: "middle", children: [(0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Checkbox, { indeterminate: checkedKeys.length > 1 && checkedKeys.length !== columns.length, checked: columns.length > 0 && checkedKeys.length === columns.length, onChange: (e) => {
                            if (e.target.checked) {
                                onChange(columns.map((o) => {
                                    o.hidden = false;
                                    return o;
                                }));
                            }
                            else {
                                onChange(columns.map((o) => {
                                    o.hidden = true;
                                    return o;
                                }));
                            }
                        }, children: LANGUAGE.ALL }) }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => onReset(), type: "link", size: "small", children: LANGUAGE.RESET })] }), placement: "topRight", trigger: ['click'], content: (0, jsx_runtime_1.jsx)(antd_1.Tree, { className: "plus-table-popover-tree", checkedKeys: checkedKeys, blockNode: true, checkable: true, draggable: true, onDrop: ({ node }) => {
                targetKey.current = node;
            }, onCheck: (x, { node }) => {
                const find = columns.find((o) => o.dataIndex === node.key);
                if (find) {
                    find.hidden = !find.hidden;
                    onChange([...columns]);
                }
            }, onDragEnd: ({ node }) => {
                const startKey = columns.findIndex((x) => x.dataIndex === node.key);
                const move = columns.splice(startKey, 1);
                const endKey = columns.findIndex((x) => x.dataIndex === targetKey.current.key);
                if (targetKey.current.dragOverGapTop) {
                    columns.splice(endKey, 0, ...move);
                }
                else {
                    columns.splice(endKey + 1, 0, ...move);
                }
                onChange([...columns]);
            }, treeData: columns
                .filter((o) => !o.fixed)
                .map((o) => ({
                title: o.title,
                key: o.dataIndex,
            })) }), children: (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: LANGUAGE.SETTING, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { icon: (0, jsx_runtime_1.jsx)(icons_1.SettingOutlined, {}) }) }) }));
}
exports.SettingPopover = SettingPopover;
