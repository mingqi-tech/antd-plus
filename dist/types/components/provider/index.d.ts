/**
 * MIT License
 *
 * Copyright (c) 2021@quick-toolkit/antd-plus ranyunlong<549510622@qq.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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
import { ReactNode } from 'react';
import { ClassTransformer } from '@quick-toolkit/class-transformer';
import { HttpClient } from '@quick-toolkit/http';
import { Locale } from 'antd/es/locale-provider';
import { ConfigProviderProps } from 'antd/es/config-provider';
export declare const PlusContext: import("react").Context<PlusProviderProps>;
/**
 * Plus组件
 * @param props
 * @constructor
 */
export declare function PlusProvider(props: PlusProviderProps): import("react").FunctionComponentElement<import("react").ProviderProps<PlusProviderProps>>;
export interface PlusProviderProps {
    locale?: AntPlusLocale;
    language?: LanguageKeys;
    antLocale?: Locale;
    antProviderProps?: ConfigProviderProps;
    http?: HttpClient;
    transformer?: ClassTransformer;
    children?: ReactNode;
    theme: 'dark' | 'light';
}
