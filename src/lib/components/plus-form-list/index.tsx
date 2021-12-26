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
import { useContext, useMemo } from 'react';

import { PlusForm } from '../plus-form';
import { FormListProps } from 'antd/lib/form';
import { ApiPropertyMetadata } from '@quicker-js/http';
import { ClassConstructor, ClassMirror } from '@quicker-js/class-decorator';

/**
 * 表单List组件
 * @param props
 * @constructor
 */
export const PlusFormList = (props: PlusFormListProps) => {
  const mirrorMap = useContext(PlusForm.Context);
  const { model } = props;

  const options = useMemo<FormListProps>(() => {
    const { name, index, rules = [], ...rest } = props;
    const newProps: FormListProps = { ...rest, name };
    if (name) {
      const mirror = mirrorMap.get(name);
      if (mirror) {
        mirror.allMetadata.forEach((o) => {
          if (o instanceof ApiPropertyMetadata) {
            const hasValidator = rules.some((o) => o.validator);
            if (
              !hasValidator &&
              o.metadata &&
              o.metadata.description &&
              o.metadata.required !== false
            ) {
              rules.push({
                validator: (rules, value, callback) => {
                  if (!value) {
                    callback(`请输入${o.metadata.description}`);
                  }
                },
              });
            }
          }
        });
      }
      if (index) {
        newProps.name = [index, name];
      }
    }
    return newProps;
  }, [props]);

  const mirrors = useMemo(
    () => ClassMirror.reflect(model).allInstanceMembers,
    [model]
  );

  return (
    <PlusForm.Context.Provider value={mirrors}>
      <Form.List {...options} />
    </PlusForm.Context.Provider>
  );
};

export interface PlusFormListProps<T extends {} = any>
  extends Omit<FormListProps, 'name'> {
  index?: number;
  name: string;
  model: ClassConstructor<T>;
}
