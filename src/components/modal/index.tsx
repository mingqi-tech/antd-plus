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

import { ClassConstructor } from '@quick-toolkit/class-mirror';
import React, { ReactNode, useMemo, useState } from 'react';
import { Modal, ModalProps } from 'antd';
import { EnvUtils, TypeUtils } from '../../utils';
import { usePlusLocale } from '../../hooks';
import { LocaleUtils } from '../../utils';

/**
 * PlusModal
 * @param props
 * @constructor
 */
export function PlusModal(props: PlusModalProps) {
  const { onOk, confirmLoading, model, ...rest } = props;
  const locale = usePlusLocale();
  const [loading, setLoading] = useState<boolean>(false);
  const title = useMemo(() => {
    if (rest.title) {
      return rest.title;
    } else if (model) {
      return LocaleUtils.getModelLocale(model, locale.language);
    }
  }, [locale.language, model, rest.title]);

  return (
    <Modal
      maskClosable={false}
      destroyOnClose
      keyboard={false}
      title={title}
      visible={Boolean(model)}
      confirmLoading={loading || confirmLoading}
      onOk={async (e) => {
        try {
          if (onOk) {
            const res = onOk(e) as Promise<void> | void;
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

export interface PlusModalProps extends Omit<ModalProps, 'visible'> {
  children?: ReactNode;
  model?: ClassConstructor;
}
