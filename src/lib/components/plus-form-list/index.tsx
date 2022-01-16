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

import { Form } from 'antd';
import { CSSProperties, ReactNode, useMemo } from 'react';

import { PlusForm } from '../plus-form';
import { FormListProps } from 'antd/lib/form';
import { ClassConstructor, ClassMirror } from '@quicker-js/class-decorator';
import { FormListFieldData, FormListOperation } from 'antd/es/form/FormList';
import { StoreValue } from 'rc-field-form/lib/interface';
import classNames from 'classnames';

/**
 * 表单List组件
 * @param props
 * @constructor
 */
export const PlusFormList = (props: PlusFormListProps) => {
  const {
    model,
    name,
    children,
    renderAfter,
    renderBefore,
    index,
    renderItem,
    listClassName,
    itemClassName,
    listStyle,
    itemStyle,
    ...rest
  } = props;

  const mirrors = useMemo(
    () => ClassMirror.reflect(model).allInstanceMembers,
    [model]
  );
  return (
    <PlusForm.Context.Provider value={mirrors}>
      <Form.List
        {...rest}
        name={index ? [index, name] : name}
        children={
          children
            ? children
            : (fields, operation, meta) => (
                <div
                  className={classNames('mq-plus-form-list', listClassName)}
                  style={listStyle}
                >
                  {typeof renderBefore === 'function' &&
                    renderBefore(operation, meta)}
                  {typeof renderItem === 'function' &&
                    fields.map((field) => (
                      <div
                        className={classNames(
                          'mq-plus-form-list-item',
                          itemClassName
                        )}
                        style={itemStyle}
                        key={field.fieldKey}
                      >
                        {renderItem(
                          field.name,
                          {
                            remove: () => operation.remove(field.name),
                            add: (defaultValue, insertIndex) =>
                              operation.add(defaultValue, insertIndex),
                            move: (to) => operation.move(field.name, to),
                          },
                          fields
                        )}
                      </div>
                    ))}
                  {typeof renderAfter === 'function' &&
                    renderAfter(operation, meta)}
                </div>
              )
        }
      />
    </PlusForm.Context.Provider>
  );
};

export interface PlusFormListProps<T extends {} = any>
  extends Omit<FormListProps, 'name' | 'children'> {
  children?: FormListProps['children'];
  renderBefore?: (
    operation: FormListOperation,
    meta: { errors: ReactNode[]; warnings: ReactNode[] }
  ) => ReactNode;
  renderAfter?: (
    operation: FormListOperation,
    meta: { errors: ReactNode[]; warnings: ReactNode[] }
  ) => ReactNode;
  index?: number;
  name: string;
  model: ClassConstructor<T>;
  renderItem?: (
    index: number,
    operation: FormListItemOperation,
    fields: FormListFieldData[]
  ) => ReactNode;
  listStyle?: CSSProperties;
  itemStyle?: CSSProperties;
  listClassName?: string;
  itemClassName?: string;
}

export interface FormListItemOperation {
  add: (defaultValue?: StoreValue, insertIndex?: number) => void;
  remove: () => void;
  move: (to: number) => void;
}
