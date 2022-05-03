/**
 * MIT License
 * Copyright (c) 2021 YunlongRan<549510622@qq.com> @quick-toolkit/ant-design-plus
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { ClassConstructor, PropertyMirror } from '@quick-toolkit/class-mirror';
import { PlusColumnsType, PlusColumnType } from '../../types';
import * as locales from '../../locales';
/**
 * 列处理工具
 */
export declare class ColumnUtils {
    /**
     * 解析列
     * @param model
     * @param columns
     * @param language
     */
    static parse<T extends {}>(model: ClassConstructor<T>, columns?: PlusColumnsType<T>, language?: LanguageKeys): PlusColumnsType<T>;
    /**
     * 设置标题
     * @param columns
     * @param allProperties
     * @param language
     */
    static setTitles<T>(columns: PlusColumnsType<T>, allProperties: Map<PropertyKey, PropertyMirror>, language: keyof typeof locales): PlusColumnsType<T>;
    /**
     * 过滤隐藏列
     * @param columns
     */
    static filter<T>(columns?: PlusColumnsType<T>): PlusColumnType<T>[];
    /**
     * 获取已选中列
     * @param columns
     */
    static getCheckedKeys<T>(columns?: PlusColumnsType<T>): any[];
}
