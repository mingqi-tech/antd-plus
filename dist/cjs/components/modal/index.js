"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlusModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const utils_1 = require("../../utils");
const hooks_1 = require("../../hooks");
const utils_2 = require("../../utils");
function PlusModal(props) {
    const { onOk, confirmLoading, model, ...rest } = props;
    const locale = (0, hooks_1.usePlusLocale)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const title = (0, react_1.useMemo)(() => {
        if (rest.title) {
            return rest.title;
        }
        else if (model) {
            return utils_2.LocaleUtils.getModelLocale(model, locale.language);
        }
    }, [locale.language, model, rest.title]);
    return ((0, jsx_runtime_1.jsx)(antd_1.Modal, { maskClosable: false, destroyOnClose: true, keyboard: false, title: title, visible: Boolean(model), confirmLoading: loading || confirmLoading, onOk: async (e) => {
            try {
                if (onOk) {
                    const res = onOk(e);
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
}
exports.PlusModal = PlusModal;
