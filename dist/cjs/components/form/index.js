"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlusForm = exports.PlusFormContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const class_mirror_1 = require("@quick-toolkit/class-mirror");
const classnames_1 = __importDefault(require("classnames"));
const utils_1 = require("../../utils");
const provider_1 = require("../provider");
const form_item_1 = require("../form-item");
const class_transformer_1 = require("@quick-toolkit/class-transformer");
const _PlusForm = (0, react_1.forwardRef)((props, ref) => {
    const { model, onFinish, onBeforeRequest, onResponse, onSuccess, onFail, className, ...rest } = props;
    const mirrors = (0, react_1.useMemo)(() => class_mirror_1.ClassMirror.reflect(model).getAllProperties(), [model]);
    const { http, transformer } = (0, react_1.useContext)(provider_1.PlusContext);
    return ((0, jsx_runtime_1.jsx)(exports.PlusFormContext.Provider, { value: mirrors, children: (0, jsx_runtime_1.jsx)(antd_1.Form, { ref: ref, autoComplete: "off", autoCapitalize: "off", autoCorrect: "off", autoSave: "off", className: (0, classnames_1.default)('mq-plus-form', className), onFinish: async (value) => {
                if (onFinish) {
                    return onFinish(value);
                }
                try {
                    if (onBeforeRequest) {
                        await onBeforeRequest(value);
                    }
                    if (http && transformer) {
                        const res = await http.fetch(transformer.transform(model, value));
                        if (onSuccess) {
                            await onSuccess(res);
                        }
                        if (onResponse) {
                            await onResponse(res);
                        }
                    }
                }
                catch (e) {
                    if (e instanceof class_transformer_1.TransformerException) {
                        const error = e.exceptions[0];
                        if (error) {
                            antd_1.notification.error({
                                message: error.message,
                            });
                        }
                    }
                    if (onFail) {
                        await onFail(e);
                    }
                    if (utils_1.EnvUtils.isDev()) {
                        console.error(e);
                    }
                }
            }, ...rest }) }));
});
exports.PlusFormContext = (0, react_1.createContext)(new Map());
exports.PlusForm = _PlusForm;
exports.PlusForm.Item = form_item_1.PlusFormItem;
exports.PlusForm.Context = exports.PlusFormContext;
