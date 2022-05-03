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
exports.ColumnUtils = void 0;
const lodash_1 = __importDefault(require("lodash"));
const class_mirror_1 = require("@quick-toolkit/class-mirror");
const http_1 = require("@quick-toolkit/http");
const locales = __importStar(require("../../locales"));
class ColumnUtils {
    static parse(model, columns = [], language = 'zh_CN') {
        return ColumnUtils.setTitles(lodash_1.default.cloneDeep(columns), class_mirror_1.ClassMirror.reflect(model).getAllProperties(), language);
    }
    static setTitles(columns, allProperties, language) {
        columns.forEach((column) => {
            if (column.title) {
                return;
            }
            const { dataIndex } = column;
            if (dataIndex) {
                if (dataIndex === '_operation') {
                    const loc = locales[language];
                    if (loc) {
                        column.title = loc.OPERATION;
                    }
                    return;
                }
                const propertyMirror = allProperties.get(dataIndex);
                if (propertyMirror) {
                    const decorates = propertyMirror.getAllDecorates(http_1.ApiPropertyDecorate);
                    decorates.forEach((decorate) => {
                        if (decorate.metadata && decorate.metadata.locales) {
                            column.title =
                                decorate.metadata.locales[language];
                        }
                    });
                }
            }
        });
        return columns;
    }
    static filter(columns = []) {
        return columns.filter((x) => !x.hidden);
    }
    static getCheckedKeys(columns = []) {
        const list = [];
        columns.forEach((x) => {
            if (!x.hidden) {
                list.push(x.dataIndex);
            }
        });
        return list;
    }
}
exports.ColumnUtils = ColumnUtils;
