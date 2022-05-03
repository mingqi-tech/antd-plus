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

import { forwardRef, useState } from 'react';
import { Button, ButtonProps } from 'antd';
import { EnvUtils, TypeUtils } from '../../utils';

export const PlusButton = forwardRef<HTMLElement, PlusButtonProps>(
  (props, ref) => {
    const { onClick, onClickError, ...rest } = props;
    const [loading, setLoading] = useState(false);
    return (
      <Button
        {...rest}
        loading={rest.loading || loading}
        ref={ref}
        onClick={async (...args) => {
          try {
            if (typeof onClick === 'function') {
              const res = onClick(...args) as Promise<void> | void;
              if (TypeUtils.isPromise(res)) {
                setLoading(true);
                await res;
              }
            }
          } catch (e) {
            if (typeof onClickError === 'function') {
              onClickError(e);
            }
            if (EnvUtils.isDev()) {
              console.log(e);
            }
          } finally {
            if (loading) {
              setLoading(false);
            }
          }
        }}
      />
    );
  }
);

export interface PlusButtonProps extends ButtonProps {
  onClickError?: (error: any) => void;
}
