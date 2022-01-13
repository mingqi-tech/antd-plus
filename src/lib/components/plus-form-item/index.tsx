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

import { Form, FormItemProps } from 'antd';
import classNames from 'classnames';
import { ApiPropertyMetadata } from '@quicker-js/http';
import React, { cloneElement, useContext, useMemo } from 'react';

import { PlusForm } from '../plus-form';
import { FormListFieldData } from 'antd/es/form/FormList';

/**
 * 表单Item组件
 * @param props
 * @constructor
 */
export const PlusFormItem = (props: PlusFormItemProps) => {
  const mirrorMap = useContext(PlusForm.Context);
  const { name, field, label, rules = [], children, ...rest } = props;
  const child = useMemo(() => React.Children.only(children), [children]);

  const { placeholder, ...options } = useMemo<
    FormItemProps & { placeholder?: string }
  >(() => {
    const newProps: FormItemProps & { placeholder?: string } = {
      name,
      rules,
      label,
    };
    if (name) {
      const mirror = mirrorMap.get(name);
      if (mirror) {
        mirror.allMetadata.forEach((o) => {
          if (o instanceof ApiPropertyMetadata) {
            if (o.metadata) {
              const hasRequired = rules.some((rule) => {
                return typeof rule !== 'function' && rule.required;
              });
              if (o.metadata.required !== false && !hasRequired) {
                rules.push({
                  message: `请输入${o.metadata.description || props.name}`,
                  required: true,
                });
                newProps.rules = rules;
              }

              if (!newProps.label && o.metadata && o.metadata.description) {
                newProps.label = label || o.metadata.description;
              }

              if (newProps.label) {
                newProps.placeholder = `请输入${newProps.label}`;
              }
            }
          }
        });
      }
    }

    return newProps;
  }, [name, label, rules, field, mirrorMap]);

  return (
    <Form.Item
      {...rest}
      {...field}
      {...options}
      name={field && name ? [field.name, name] : name}
      className={classNames('mq-plus-form-item', props.className)}
      children={cloneElement(child as any, {
        placeholder,
      })}
    />
  );
};

export interface PlusFormItemProps extends Omit<FormItemProps, 'name'> {
  field?: FormListFieldData;
  placeholder?: string;
  name?: string;
}
