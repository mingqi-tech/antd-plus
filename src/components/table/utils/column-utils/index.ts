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
import {
  ClassConstructor,
  ClassMirror,
  PropertyMirror,
} from '@quick-toolkit/class-mirror';
import { ApiPropertyDecorate } from '@quick-toolkit/http';
import { PlusColumnsType, PlusColumnType } from '../../types';
import * as locales from '../../locales';

/**
 * 列处理工具
 */
export class ColumnUtils {
  /**
   * 解析列
   * @param model
   * @param columns
   * @param language
   */
  public static parse<T extends {}>(
    model: ClassConstructor<T>,
    columns: PlusColumnsType<T> = [],
    language: LanguageKeys = 'zh_CN'
  ): PlusColumnsType<T> {
    return ColumnUtils.setTitles(
      _.cloneDeep(columns as any),
      ClassMirror.reflect(model).getAllProperties(),
      language as any
    );
  }

  /**
   * 设置标题
   * @param columns
   * @param allProperties
   * @param language
   */
  public static setTitles<T>(
    columns: PlusColumnsType<T>,
    allProperties: Map<PropertyKey, PropertyMirror>,
    language: keyof typeof locales
  ) {
    columns.forEach((column: PlusColumnType<T>) => {
      if (column.title) {
        return;
      }
      const { dataIndex } = column;
      if (dataIndex) {
        if (dataIndex === '_operation') {
          const loc = locales[language];
          if (loc) {
            column.title = loc.OPERATION;
          }
          return;
        }
        const propertyMirror = allProperties.get(dataIndex);
        if (propertyMirror) {
          const decorates = propertyMirror.getAllDecorates(ApiPropertyDecorate);
          decorates.forEach((decorate) => {
            if (decorate.metadata && decorate.metadata.locales) {
              column.title =
                decorate.metadata.locales[language as LanguageKeys];
            }
          });
        }
      }
    });
    return columns;
  }

  /**
   * 过滤隐藏列
   * @param columns
   */
  public static filter<T>(columns: PlusColumnsType<T> = []) {
    return columns.filter((x) => !x.hidden);
  }

  /**
   * 获取已选中列
   * @param columns
   */
  public static getCheckedKeys<T>(columns: PlusColumnsType<T> = []) {
    const list: any[] = [];
    columns.forEach((x) => {
      if (!x.hidden) {
        list.push(x.dataIndex);
      }
    });
    return list;
  }
}
