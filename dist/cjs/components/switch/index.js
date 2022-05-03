"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlusSwitch = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_1 = require("react");
const utils_1 = require("../../utils");
exports.PlusSwitch = (0, react_1.forwardRef)((props, ref) => {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { onChange, checked, trueValue = true, falseValue = false, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)(antd_1.Switch, { ref: ref, loading: loading, checked: checked === trueValue, onChange: async (checked, event) => {
            try {
                if (onChange) {
                    const res = onChange(checked ? trueValue : falseValue, event);
                    if (utils_1.TypeUtils.isPromise(res)) {
                        setLoading(true);
                        await res;
                    }
                }
            }
            catch (e) {
                if (utils_1.EnvUtils.isDev()) {
                    console.error(e);
                }
            }
            finally {
                if (loading) {
                    setLoading(false);
                }
            }
        }, ...rest }));
});
