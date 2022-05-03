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

import { Switch, SwitchProps } from 'antd';
import { forwardRef, useState } from 'react';
import { EnvUtils, TypeUtils } from '../../utils';

/**
 * @component PlusSwitch
 */
export const PlusSwitch = forwardRef<HTMLElement, PlusSwitchProps>(
  (props, ref) => {
    const [loading, setLoading] = useState(false);
    const {
      onChange,
      checked,
      trueValue = true,
      falseValue = false,
      ...rest
    } = props;
    return (
      <Switch
        ref={ref}
        loading={loading}
        checked={checked === trueValue}
        onChange={async (checked, event) => {
          try {
            if (onChange) {
              const res = onChange(checked ? trueValue : falseValue, event);
              if (TypeUtils.isPromise(res)) {
                setLoading(true);
                await res;
              }
            }
          } catch (e) {
            if (EnvUtils.isDev()) {
              console.error(e);
            }
          } finally {
            if (loading) {
              setLoading(false);
            }
          }
        }}
        {...rest}
      />
    );
  }
);

export interface PlusSwitchProps extends SwitchProps {
  onChange?: (checked: boolean, event: MouseEvent) => Promise<void> | void;
  trueValue?: any;
  falseValue?: any;
}
