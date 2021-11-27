/**
 * MIT License
 *
 * Copyright (c) 2021 @mingqi/antd-plus ranyunlong<549510622@qq.com>
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

import { Form, FormProps } from 'antd';
import {
  ClassConstructor,
  ClassMirror,
  MethodMirror,
  PropertyMirror,
} from '@quicker-js/class-decorator';
import { createContext, useContext, useMemo } from 'react';
import classTransformer from '@quicker-js/class-transformer';
import classNames from 'classnames';
import { AxiosResponse, AxiosError } from 'axios';

import { PlusFormItem } from '../plus-form-item';
import { Context } from '../../context';

/**
 * 表单组件
 * @param props
 * @constructor
 */
export const PlusForm = <R, T extends {}>(props: PlusFormProps<R, T>) => {
  const { model, onFinish, onResponse, className, ...rest } = props;
  const { http } = useContext(Context);
  const mirrors = useMemo(
    () => ClassMirror.reflect(model).allInstanceMembers,
    [model]
  );
  return (
    <PlusForm.Context.Provider value={mirrors}>
      <Form
        {...rest}
        className={classNames('mq-plus-form', className)}
        onFinish={async (...args) => {
          if (onFinish) {
            return onFinish(...args);
          }
          if (http) {
            try {
              const res = await http.fetch(
                classTransformer.plainToInstance(model, args[0])
              );

              if (onResponse) {
                onResponse(res);
              }
            } catch (e) {
              if (onResponse) {
                onResponse(e as any);
              }
            }
          }
        }}
      />
    </PlusForm.Context.Provider>
  );
};

PlusForm.Context = createContext<
  Map<PropertyKey, PropertyMirror | MethodMirror>
>(new Map());
PlusForm.Item = PlusFormItem;

export interface PlusFormProps<R = any, T extends object = {}>
  extends FormProps<T> {
  model: ClassConstructor<T>;
  onResponse?: (res: AxiosResponse<R> | AxiosResponse<AxiosError>) => void;
}
