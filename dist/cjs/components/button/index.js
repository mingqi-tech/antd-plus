"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlusButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const utils_1 = require("../../utils");
exports.PlusButton = (0, react_1.forwardRef)((props, ref) => {
    const { onClick, onClickError, ...rest } = props;
    const [loading, setLoading] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsx)(antd_1.Button, { ...rest, loading: rest.loading || loading, ref: ref, onClick: async (...args) => {
            try {
                if (typeof onClick === 'function') {
                    const res = onClick(...args);
                    if (utils_1.TypeUtils.isPromise(res)) {
                        setLoading(true);
                        await res;
                    }
                }
            }
            catch (e) {
                if (typeof onClickError === 'function') {
                    onClickError(e);
                }
                if (utils_1.EnvUtils.isDev()) {
                    console.log(e);
                }
            }
            finally {
                if (loading) {
                    setLoading(false);
                }
            }
        } }));
});
