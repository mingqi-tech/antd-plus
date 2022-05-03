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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlusFormItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const classnames_1 = __importDefault(require("classnames"));
const http_1 = require("@quick-toolkit/http");
const react_1 = __importStar(require("react"));
const form_1 = require("../form");
const provider_1 = require("../provider");
const locales_1 = require("../../locales");
const PlusFormItem = (props) => {
    const mirrorMap = (0, react_1.useContext)(form_1.PlusFormContext);
    const { locale = locales_1.zh_CN, antLocale } = (0, react_1.useContext)(provider_1.PlusContext);
    const { name, index, label, hidden, rules = [], dependencies, shouldUpdate, children, ...rest } = props;
    const child = (0, react_1.useMemo)(() => shouldUpdate || (Array.isArray(dependencies) && dependencies.length)
        ? children
        : react_1.default.Children.only(children), [children, shouldUpdate, dependencies]);
    const { placeholder, ...options } = (0, react_1.useMemo)(() => {
        const newProps = {
            name,
            rules,
            label,
        };
        if (name && !hidden) {
            const mirror = mirrorMap.get(name);
            if (mirror) {
                mirror.getAllDecorates(http_1.ApiPropertyDecorate).forEach((o) => {
                    if (o.metadata) {
                        const hasRequired = rules.some((rule) => {
                            return typeof rule !== 'function' && rule.required !== undefined;
                        });
                        if (!newProps.label && o.metadata && !newProps.label) {
                            if (o.metadata.locales) {
                                const lang = o.metadata.locales[locale.language];
                                if (lang) {
                                    newProps.label = lang || label || o.metadata.description;
                                }
                            }
                            else {
                                newProps.label = label || o.metadata.description;
                            }
                        }
                        if (o.metadata.required !== false && !hasRequired) {
                            rules.push({
                                required: true,
                            });
                            newProps.rules = rules;
                        }
                    }
                });
            }
        }
        if (typeof newProps.label === 'string') {
            if (antLocale &&
                antLocale.Form &&
                antLocale.Form.defaultValidateMessages &&
                typeof antLocale.Form.defaultValidateMessages.required === 'string') {
                newProps.placeholder =
                    antLocale.Form.defaultValidateMessages.required.replace('${label}', newProps.label);
            }
            else {
                newProps.placeholder = newProps.label;
            }
            if (Array.isArray(newProps.rules) && newProps.placeholder) {
                const find = newProps.rules.find((rule) => rule.required);
                if (find && !find.message) {
                    find.message = newProps.placeholder;
                }
            }
        }
        return newProps;
    }, [locale.language, name, rules, label, mirrorMap, hidden, antLocale]);
    return ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, { ...rest, ...options, hidden: hidden, shouldUpdate: shouldUpdate, dependencies: dependencies, name: typeof index === 'number' && name ? [index, name] : name, className: (0, classnames_1.default)('mq-plus-form-item', props.className), children: shouldUpdate
            ? child
            : (0, react_1.cloneElement)(child, {
                placeholder,
            }) }));
};
exports.PlusFormItem = PlusFormItem;
