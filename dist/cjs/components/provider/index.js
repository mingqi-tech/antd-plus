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
exports.PlusProvider = exports.PlusContext = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const zh_CN_1 = __importDefault(require("antd/lib/locale/zh_CN"));
const locales = __importStar(require("../../locales"));
exports.PlusContext = (0, react_1.createContext)({
    locale: locales.zh_CN,
    antLocale: zh_CN_1.default,
    theme: 'light',
});
function PlusProvider(props) {
    const { children, antProviderProps = {}, ...value } = props;
    value.antLocale = value.antLocale || antProviderProps?.locale;
    return (0, react_1.createElement)(exports.PlusContext.Provider, {
        value,
        children: (0, react_1.createElement)(antd_1.ConfigProvider, {
            locale: props.antLocale,
            ...antProviderProps,
            children,
        }),
    });
}
exports.PlusProvider = PlusProvider;
