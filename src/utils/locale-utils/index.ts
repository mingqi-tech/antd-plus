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

import { ClassConstructor, ClassMirror } from '@quick-toolkit/class-mirror';
import { ApiRequestDecorate } from '@quick-toolkit/http';

/**
 * 本地语言包处理工具
 */
export class LocaleUtils {
  /**
   * 获取模型的locale
   */
  public static getModelLocale(
    model: ClassConstructor,
    language: LanguageKeys
  ): string | null {
    const classMirror = ClassMirror.reflect(model);
    const decorates = classMirror.getAllDecorates(ApiRequestDecorate);
    let title: string | null = null;
    let description: string | null = null;
    decorates.find((decorate) => {
      const { metadata } = decorate;
      const locales = metadata.locales;
      if (locales && locales[language]) {
        title = locales[language] || null;
        if (!description && metadata.description) {
          description = metadata.description;
        }
        return true;
      }
      return false;
    });
    return title || description;
  }
}
