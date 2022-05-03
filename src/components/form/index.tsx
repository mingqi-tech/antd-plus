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

import React, { createContext, forwardRef, useContext, useMemo } from 'react';
import { Form, FormInstance, FormProps, notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import {
  ClassConstructor,
  ClassMirror,
  MethodMirror,
  PropertyMirror,
} from '@quick-toolkit/class-mirror';
import classNames from 'classnames';
import { EnvUtils } from '../../utils';
import { PlusContext } from '../provider';
import { PlusFormItem } from '../form-item';
import { TransformerException } from '@quick-toolkit/class-transformer';

const _PlusForm = forwardRef<FormInstance, PlusFormProps>((props, ref) => {
  const {
    model,
    onFinish,
    onBeforeRequest,
    onResponse,
    onSuccess,
    onFail,
    className,
    ...rest
  } = props;
  const mirrors = useMemo(
    () => ClassMirror.reflect(model).getAllProperties(),
    [model]
  );
  const { http, transformer } = useContext(PlusContext);
  return (
    <PlusFormContext.Provider value={mirrors}>
      <Form
        ref={ref}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        autoSave="off"
        className={classNames('mq-plus-form', className)}
        onFinish={async (value) => {
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
          } catch (e) {
            if (e instanceof TransformerException) {
              const error = e.exceptions[0];
              if (error) {
                notification.error({
                  message: error.message,
                });
              }
            }
            if (onFail) {
              await onFail(e as any);
            }
            if (EnvUtils.isDev()) {
              console.error(e);
            }
          }
        }}
        {...rest}
      />
    </PlusFormContext.Provider>
  );
}) as any;

export const PlusFormContext = createContext<
  Map<PropertyKey, PropertyMirror | MethodMirror>
>(new Map());

export type PlusFormFC = React.FC<PlusFormProps> & {
  Item: typeof PlusFormItem;
  Context: typeof PlusFormContext;
};

export const PlusForm: PlusFormFC = _PlusForm;

PlusForm.Item = PlusFormItem;
PlusForm.Context = PlusFormContext;

export interface PlusFormProps<R = any, T extends object = {}>
  extends FormProps<T> {
  model: ClassConstructor<T>;
  onBeforeRequest?: (value: Partial<T>) => void | Promise<void>;
  onResponse?: (
    res: AxiosResponse<R> | AxiosResponse<AxiosError>
  ) => void | Promise<void>;
  onSuccess?: (res: AxiosResponse<R>) => void | Promise<void>;
  onFail?: (err: AxiosResponse<AxiosError>) => void | Promise<void>;
}
