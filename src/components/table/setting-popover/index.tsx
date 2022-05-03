/**
 * MIT License
 * Copyright (c) 2021 YunlongRan<549510622@qq.com> @quick-toolkit/ant-design-plus
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
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

import { Button, Checkbox, Popover, Row, Space, Tooltip, Tree } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useMemo, useRef } from 'react';
import { PlusColumnsType } from '../types';
import { ColumnUtils } from '../utils';
import { usePlusLocale } from '../../../hooks';
import * as locales from '../locales';

/**
 * 表格列设置组件
 * @param props
 * @constructor
 */
export function SettingPopover<T extends {} = {}>(
  props: SettingPopoverProps<T>
) {
  const { columns, onChange, onReset } = props;
  const targetKey = useRef<any>();
  const checkedKeys = ColumnUtils.getCheckedKeys(columns);
  const locale = usePlusLocale();

  const LANGUAGE = useMemo(
    () => locales[locale.language as keyof typeof locales],
    [locale.language]
  );
  return (
    <Popover
      title={
        <Row justify="space-between" align="middle">
          <Space>
            <Checkbox
              indeterminate={
                checkedKeys.length > 1 && checkedKeys.length !== columns.length
              }
              checked={
                columns.length > 0 && checkedKeys.length === columns.length
              }
              onChange={(e) => {
                if (e.target.checked) {
                  onChange(
                    columns.map((o) => {
                      o.hidden = false;
                      return o;
                    })
                  );
                } else {
                  onChange(
                    columns.map((o) => {
                      o.hidden = true;
                      return o;
                    })
                  );
                }
              }}
            >
              {LANGUAGE.ALL}
            </Checkbox>
          </Space>

          <Button
            onClick={() => onReset()}
            type="link"
            size="small"
            children={LANGUAGE.RESET}
          />
        </Row>
      }
      placement="topRight"
      trigger={['click']}
      content={
        <Tree
          className="plus-table-popover-tree"
          checkedKeys={checkedKeys}
          blockNode
          checkable
          draggable
          onDrop={({ node }) => {
            targetKey.current = node;
          }}
          onCheck={(x, { node }) => {
            const find = columns.find((o) => o.dataIndex === node.key);
            if (find) {
              find.hidden = !find.hidden;
              onChange([...columns]);
            }
          }}
          onDragEnd={({ node }) => {
            const startKey = columns.findIndex((x) => x.dataIndex === node.key);
            const move = columns.splice(startKey, 1);
            const endKey = columns.findIndex(
              (x) => x.dataIndex === targetKey.current.key
            );
            if (targetKey.current.dragOverGapTop) {
              columns.splice(endKey, 0, ...move);
            } else {
              columns.splice(endKey + 1, 0, ...move);
            }
            onChange([...columns]);
          }}
          treeData={columns
            .filter((o) => !o.fixed)
            .map((o: any) => ({
              title: o.title,
              key: o.dataIndex,
            }))}
        />
      }
    >
      <Tooltip title={LANGUAGE.SETTING}>
        <Button icon={<SettingOutlined />} />
      </Tooltip>
    </Popover>
  );
}

export interface SettingPopoverProps<T> {
  columns: PlusColumnsType<T>;
  onChange: (newColumns: any[]) => void;
  onReset: () => void;
}
