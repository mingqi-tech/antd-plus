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
import { cloneElement, useContext, useMemo } from 'react';

import { PlusForm } from '../plus-form';

/**
 * 表单Item组件
 * @param props
 * @constructor
 */
export const PlusFormItem = (props: PlusFormItemProps) => {
  const mirrorMap = useContext(PlusForm.Context);

  const option = useMemo<PlusFormItemProps>(() => {
    if (props.name) {
      const mirror = mirrorMap.get(props.name as any);
      if (mirror) {
        const options: PlusFormItemProps = { ...props };
        mirror.allMetadata.forEach((o) => {
          if (o instanceof ApiPropertyMetadata) {
            if (o.metadata) {
              if (o.metadata.required) {
                options.rules = options.rules || [
                  {
                    required: true,
                    message: `请输入${o.metadata.description || props.name}`,
                  },
                ];
              }
              options.label = options.label || o.metadata.description;
              if (options.label) {
                options.placeholder = `请输入${options.label}`;
              }
            }
          }
        });
        return options;
      }
    }

    return props;
  }, [props, mirrorMap]);

  return (
    <Form.Item
      {...option}
      className={classNames('mq-plus-form-item', props.className)}
      children={cloneElement(props.children as any, {
        placeholder: option.placeholder,
      })}
    />
  );
};

export interface PlusFormItemProps extends FormItemProps {
  placeholder?: string;
}
