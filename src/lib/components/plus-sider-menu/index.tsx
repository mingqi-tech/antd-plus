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

import { Menu, MenuProps, message } from 'antd';
import classNames from 'classnames';
import { RCRoute, useRoute } from '@mingqi/rc-router-dom';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { createElement, useEffect, useMemo, useState } from 'react';

/**
 * 遍历菜单
 * @param navigate
 * @param menuList
 */
const menuMapping = (navigate: NavigateFunction, menuList: RCRoute[]) => {
  return menuList.map((o) => {
    if (o.children && o.children.length) {
      return (
        <Menu.SubMenu
          icon={o.icon ? createElement(o.icon) : undefined}
          key={o.getFullPath()}
          title={o.title}
        >
          {menuMapping(navigate, o.children)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item
        onClick={() => {
          if (o.keys.length === 0) {
            navigate(o.getFullPath());
          } else {
            const msg = `The path need ${o.keys
              .map((o) => `'${o.name}'`)
              .join('/')} arguments.\n    as name: ${
              o.title || ''
            }\n    as path: ${o.getFullPath()}\n    as file: ${module.id}`;
            void message.warn(msg);
            console.warn(msg);
          }
        }}
        icon={o.icon ? createElement(o.icon) : undefined}
        key={o.getFullPath()}
        title={o.title}
        children={o.title}
      />
    );
  });
};

/**
 * 菜单组件
 * @param props
 * @constructor
 */
export const PlusSiderMenu = (props: MenuProps) => {
  const navigate = useNavigate();
  const { style, className, ...rest } = props;
  const rcRoute = useRoute();
  const menuList = useMemo<RCRoute<any>[]>(() => {
    if (rcRoute && rcRoute.children) {
      return rcRoute.children;
    }
    return [];
  }, [rcRoute]);
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname);

  useEffect(() => {
    setActiveKey(location.pathname);
  }, [location.pathname]);
  const openKeys = useMemo(() => {
    const list: string[] = [];
    const strings = activeKey.split('/');
    strings.forEach((o, i) => {
      const v = strings.slice(0, i + 1).join('/');
      if (v) {
        list.push(v);
      }
    });
    return list;
  }, [activeKey]);

  return (
    <div className={classNames('mq-plus-sider-menu', className)} style={style}>
      <Menu {...rest} activeKey={activeKey} defaultOpenKeys={openKeys}>
        {menuMapping(navigate, menuList)}
      </Menu>
    </div>
  );
};
