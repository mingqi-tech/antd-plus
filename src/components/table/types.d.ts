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

import * as React from 'react';
import { TooltipProps } from 'antd/lib/tooltip';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import {
  ColumnFilterItem,
  ColumnTitle,
  CompareFn,
  FilterDropdownProps,
  FilterSearchType,
  FilterValue,
  SortOrder,
} from 'antd/lib/table/interface';
import {
  AlignType,
  CellEllipsisType,
  FixedType,
  GetComponentProps,
  Key,
  RenderedCell,
} from 'rc-table/lib/interface';

declare interface PlusColumnGroupType<T extends {} = {}>
  extends Omit<PlusColumnType<T>, 'dataIndex'> {
  children: PlusColumnsType<T>;
}

declare interface PlusColumnType<T extends {} = {}> {
  title?: ColumnTitle<T>;
  hidden?: boolean;
  sorter?:
    | boolean
    | CompareFn<T>
    | {
        compare?: CompareFn<T>;
        /** Config multiple sorter order priority */
        multiple?: number;
      };
  sortOrder?: SortOrder;
  defaultSortOrder?: SortOrder;
  sortDirections?: SortOrder[];
  showSorterTooltip?: boolean | TooltipProps;
  filtered?: boolean;
  filters?: ColumnFilterItem[];
  filterDropdown?:
    | React.ReactNode
    | ((props: FilterDropdownProps) => React.ReactNode);
  filterMultiple?: boolean;
  filteredValue?: FilterValue | null;
  defaultFilteredValue?: FilterValue | null;
  filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode);
  filterMode?: 'menu' | 'tree';
  filterSearch?: FilterSearchType;
  onFilter?: (value: string | number | boolean, record: T) => boolean;
  filterDropdownVisible?: boolean;
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
  responsive?: Breakpoint[];
  colSpan?: number;
  dataIndex: keyof T | '_operation';
  render?: (
    value: any,
    record: T,
    index: number
  ) => React.ReactNode | RenderedCell<T>;
  shouldCellUpdate?: (record: T, prevRecord: T) => boolean;
  rowSpan?: number;
  width?: number | string;
  onCell?: GetComponentProps<T>;
  key?: Key;
  className?: string;
  fixed?: FixedType;
  onHeaderCell?: GetComponentProps<PlusColumnsType<T>[number]>;
  ellipsis?: CellEllipsisType;
  align?: AlignType;
}

declare type PlusColumnsType<T extends {} = {}> = PlusColumnType<T>[];
