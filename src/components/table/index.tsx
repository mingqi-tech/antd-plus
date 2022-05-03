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

import _ from 'lodash';
import { ReactNode, useState } from 'react';
import { Button, Card, Row, Space, Table, TableProps } from 'antd';
import { ClassConstructor } from '@quick-toolkit/class-mirror';
import { ReloadOutlined } from '@ant-design/icons';

import { PlusColumnsType } from './types';
import { SettingPopover } from './setting-popover';
import { useColumns } from './use-columns';
import { ColumnUtils } from './utils';
import './styles/index.less';

/**
 * Table component
 * @param props
 * @constructor
 */
export function PlusTable<T extends {}>(props: PlusTableProps<T>) {
  const {
    model,
    columns = [],
    size,
    beforeTools,
    onReload,
    afterTools,
    ...rest
  } = props;
  const columnsObj = useColumns(model, columns);
  const [colSorts, setColSorts] = useState(_.cloneDeep(columnsObj));
  return (
    <Card className="plus-table">
      <Row className="plus-table-tools" align="middle" justify="space-between">
        <div>
          <Space>{beforeTools}</Space>
        </div>
        <Space>
          {afterTools}
          {typeof onReload === 'function' && (
            <Button icon={<ReloadOutlined />} onClick={onReload} />
          )}
          <SettingPopover
            columns={colSorts}
            onChange={(v) => setColSorts(v)}
            onReset={() => setColSorts(_.cloneDeep(columnsObj))}
          />
        </Space>
      </Row>
      <Table
        size={size || 'small'}
        columns={
          ColumnUtils.filter(colSorts).map((x) => {
            const find = columnsObj.find((o) => o.dataIndex === x.dataIndex);
            return {
              ...x,
              ...find,
              hidden: x.hidden,
            };
          }) as any
        }
        rowKey="id"
        {...rest}
      />
    </Card>
  );
}

export interface PlusTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  model: ClassConstructor<T>;
  columns?: PlusColumnsType<T>;
  beforeTools?: ReactNode;
  afterTools?: ReactNode;
  onReload?: () => void;
}
