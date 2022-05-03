"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlusFormList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = require("react");
const class_mirror_1 = require("@quick-toolkit/class-mirror");
const form_1 = require("../form");
const PlusFormList = (props) => {
    const { model, name, children, renderAfter, renderBefore, index, renderItem, listClassName, itemClassName, listStyle, itemStyle, ...rest } = props;
    const mirrors = (0, react_1.useMemo)(() => class_mirror_1.ClassMirror.reflect(model).getAllInstanceMembers(), [model]);
    return ((0, jsx_runtime_1.jsx)(form_1.PlusForm.Context.Provider, { value: mirrors, children: (0, jsx_runtime_1.jsx)(antd_1.Form.List, { ...rest, name: index ? [index, name] : name, children: children
                ? children
                : (fields, operation, meta) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)('mq-plus-form-list', listClassName), style: listStyle, children: [typeof renderBefore === 'function'
                            ? renderBefore(operation, meta)
                            : null, fields.map((field) => {
                            if (typeof renderItem === 'function') {
                                const children = renderItem(field.name, {
                                    remove: () => operation.remove(field.name),
                                    add: (defaultValue, insertIndex) => operation.add(defaultValue, insertIndex),
                                    move: (to) => operation.move(field.name, to),
                                }, fields);
                                return ((0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)('mq-plus-form-list-item', itemClassName), style: itemStyle, children: children }, field.key));
                            }
                            return null;
                        }), typeof renderAfter === 'function'
                            ? renderAfter(operation, meta)
                            : null] })) }) }));
};
exports.PlusFormList = PlusFormList;
