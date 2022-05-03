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
import React from 'react';
import { FormProps } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { ClassConstructor, MethodMirror, PropertyMirror } from '@quick-toolkit/class-mirror';
import { PlusFormItem } from '../form-item';
export declare const PlusFormContext: React.Context<Map<PropertyKey, PropertyMirror<any> | MethodMirror<any, any>>>;
export declare type PlusFormFC = React.FC<PlusFormProps> & {
    Item: typeof PlusFormItem;
    Context: typeof PlusFormContext;
};
export declare const PlusForm: PlusFormFC;
export interface PlusFormProps<R = any, T extends object = {}> extends FormProps<T> {
    model: ClassConstructor<T>;
    onBeforeRequest?: (value: Partial<T>) => void | Promise<void>;
    onResponse?: (res: AxiosResponse<R> | AxiosResponse<AxiosError>) => void | Promise<void>;
    onSuccess?: (res: AxiosResponse<R>) => void | Promise<void>;
    onFail?: (err: AxiosResponse<AxiosError>) => void | Promise<void>;
}
