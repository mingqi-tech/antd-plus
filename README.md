# ant-design-plus

The `ant-design-plus` uses `ant@4.17` developed a react component.

## Installing

```shell
# ant库
npm i antd @quick-toolkit/rc-router-dom @quick-toolkit/class-decorator @quick-toolkit/class-transformer @quick-toolkit/http @quick-toolkit/ant-design-plus
#or
yarn add @quick-toolkit/rc-router-dom @quick-toolkit/class-decorator @quick-toolkit/class-transformer @quick-toolkit/http @quick-toolkit/ant-design-plus
```

[@quick-toolkit/rc-router-dom](https://quick-toolkit.github.io/rc-router-dom/)
提供路由解析和提供路由的上下文信息， [@quick-toolkit/class-decorator](https://quick-toolkit.github.io/class-decorator/)
提供类装饰器映射，[@quick-toolkit/class-transformer](https://quick-toolkit.github.io/class-transformer/) 提供实例转换功能，
[@quick-toolkit/http](https://quick-toolkit.github.io/http/) 提供在发起http请求时根据装饰器注解的信息自动请求

## Example Usage

```ts
// import components
import {PlusForm} from '@quick-toolkit/ant-design-plus';
// import css
import '@quick-toolkit/ant-design-plus/dist/cjs/index.css'
// or import less file.
import '@quick-toolkit/ant-design-plus/src/lib/components/index.less'
```

- **PlusForm** component
-

> Your must before create [http](https://quick-toolkit.github.io/http/) instance and use [PlusConfigProvider](https://quick-toolkit.github.io/ant-design-plus/modules.html#PlusConfigProvider)
provide http, see more [PlusForm](https://quick-toolkit.github.io/ant-design-plus/modules.html#PlusForm) and [PlusForm.Item](https://quick-toolkit.github.io/ant-design-plus/modules.html#PlusFormItem)

```ts
// http.ts
import {HttpClient} from '@quick-toolkit/http';
import qs from 'qs';
import {Modal} from 'antd';

export const http = new HttpClient({
    baseURL: '/api',
    transformRequest: [
        (data, ...args) => {
            if (
                data instanceof FormData ||
                Object.prototype.toString.call(data) === '[object FormData]' ||
                Object.prototype.toString.call(data) === '[object String]'
            ) {
                return data;
            }
            return qs.stringify(data, {
                allowDots: true,
            });
        },
    ],
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

http.interceptors.response.use((res) => {
    // tansform string response
    if (typeof res.data === 'string') {
        const data = (res.data = JSON.parse(res.data));
    }
});

```

```tsx
import {http} from './http';

export function App() {
    return (
        <PlusConfigProvider value={{http}}>
            Your application
        </PlusConfigProvider>
    )
}
```

```ts
/**
 * api/login-response-dto.ts
 * @class LoginResponseDto
 */
import {Typed} from '@quick-toolkit/class-transformer';
import {ApiProperty} from '@quick-toolkit/http';

export class LoginResponseDto {
    /**
     * 访问token
     */
    @ApiProperty({description: '访问token', type: 'object'})
    @Typed()
    public accessToken: string;

    /**
     * 账户ID
     */
    @ApiProperty({description: '账户ID', type: 'object'})
    @Typed()
    public accountId: string;

    /**
     * 权限列表
     */
    @ApiProperty({description: '权限列表', type: 'object'})
    @TypedArray(String)
    public authorities: string[];

    /**
     * 姓名
     */
    @ApiProperty({description: '姓名', type: 'object'})
    @Typed()
    public name: string;

    /**
     * 账户名称
     */
    @ApiProperty({description: '账户名称', type: 'object'})
    @Typed()
    public username: string;

    /**
     * 唯一标识uuid
     */
    @ApiProperty({description: '唯一标识uuid', type: 'object'})
    @Typed()
    public uuid: string;
}

```

```ts
/**
 * api/http-resource.ts
 * @class HttpResource
 */
import {CaptchaImageDto} from './captcha-image-dto';
import {LoginResponseDto} from './login-response-dto';
import {Typed} from '@quick-toolkit/class-transformer';
import {ApiProperty} from '@quick-toolkit/http';

export class HttpResource<T> {
    @ApiProperty({type: 'string'})
    @Typed()
    public code: string;

    @Typed(CaptchaImageDto, {
        scenes: [
            {
                value: 'HttpResource<CaptchaImageDto>'
            },
            {
                value: 'HttpResource<LoginResponseDto>',
            }
        ],
    })
    public data: T;

    @ApiProperty({type: 'string'})
    @Typed()
    public message: string;

    @ApiProperty({type: 'boolean'})
    @Typed()
    public ok: boolean;
}

```

```ts
/**
 * 用户登陆验证
 * api/post-auth-login.ts
 * @class PostAuthLogin
 */
import {Typed} from '@quick-toolkit/class-transformer';
import {ApiProperty, ApiRequest} from '@quick-toolkit/http';
import {HttpResource} from './http-resource';

@ApiRequest({
    url: '/auth/login',
    method: 'post',
    description: '用户登陆验证',
    scene: 'HttpResource<LoginResponseDto>',
    response: HttpResource,
})
export class PostAuthLogin {
    /**
     * 账户密码
     */
    @ApiProperty({in: 'query', type: 'string', description: '账户密码'})
    @Typed()
    public password?: string;

    /**
     * 账户名称
     */
    @ApiProperty({in: 'query', type: 'string', description: '账户名称'})
    @Typed()
    public username?: string;

    /**
     * 图片验证码uuid
     */
    @ApiProperty({in: 'query', type: 'string', description: '图片验证码uuid'})
    @Typed()
    public uuid?: string;

    /**
     * 验证码
     */
    @ApiProperty({in: 'query', type: 'string', description: '验证码'})
    @Typed()
    public verifyCode?: string;
}

```

```tsx
import {Button, Input, Layout, Typography} from 'antd';
import {PostAuthLogin} from './post-auth-login';
import {PlusForm} from '@quick-toolkit/ant-design-plus';
import {
    EyeInvisibleOutlined,
    EyeOutlined,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {useState} from 'react';
import {HttpResource} from '../../../../api/http-resource';

export default () => {
    const [type, setType] = useState<'text' | 'password'>('password');
    return (
        <div className="content">
            <div className="layout">
                <Typography.Title level={3}>登陆</Typography.Title>
                <PlusForm
                    model={PostAuthLogin}
                    layout="vertical"
                    onResponse={(res) => {
                        if (res.data instanceof HttpResource) {
                            // response to HttpResource<LoginResponseDto>
                        }
                    }}
                >
                    <PlusForm.Item name="username">
                        <Input addonBefore={<UserOutlined/>}/>
                    </PlusForm.Item>
                    <PlusForm.Item name="password">
                        <Input
                            addonBefore={<LockOutlined/>}
                            type={type}
                            suffix={
                                type === 'text' ? (
                                    <EyeOutlined onClick={() => setType('password')}/>
                                ) : (
                                    <EyeInvisibleOutlined onClick={() => setType('text')}/>
                                )
                            }
                        />
                    </PlusForm.Item>

                    <PlusForm.Item>
                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            children="提交"
                        />
                    </PlusForm.Item>
                </PlusForm>
            </div>
        </div>
    );
};
 ```

- **PlusBreadcrumb** component

> Your must uses [@quick-toolkit/rc-router-dom](https://quick-toolkit.github.io/rc-router-dom), [PlusBreadcrumb](https://quick-toolkit.github.io/ant-design-plus/modules.html#PlusBreadcrumb) in [RCRoute](https://quick-toolkit.github.io/rc-router-dom/classes/RCRoute.html#Context) context.

```tsx
import {PlusBreadcrumb} from '@quick-toolkit/ant-design-plus';
import {Button, Input, Layout} from 'antd';

export default () => {
    return (
        <Layout>
            {/* use PlusBreadcrumb */}
            <PlusBreadcrumb/>
            <div className="page">
                This is a page.
            </div>
        </Layout>
    );
};

```

- **PlusSiderMenu** component

> Your must uses [@quick-toolkit/rc-router-dom](https://quick-toolkit.github.io/rc-router-dom), [PlusSiderMenu](https://quick-toolkit.github.io/ant-design-plus/modules.html#PlusSiderMenu)  in [RCRoute](https://quick-toolkit.github.io/rc-router-dom/classes/RCRoute.html#Context) context.

```tsx
import {Layout} from 'antd';
import React, {Suspense, useEffect} from 'react';
import {Outlet, useMatch, useNavigate} from 'react-router-dom';
import {PlusSiderMenu} from '@quick-toolkit/ant-design-plus';

import {AutoLoading} from '../../components';
import './styles/index.less';

export default () => {
    const navigate = useNavigate();

    return (
        <Layout className="authentication">
            <Layout.Header/>
            <Layout>
                <Layout.Sider collapsed={false} theme="light">
                    <PlusSiderMenu mode="inline" theme="light"/>
                </Layout.Sider>
                <Layout.Content className="pages">
                    <Suspense fallback={<AutoLoading/>}>
                        <Outlet/>
                    </Suspense>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};
```

## Documentation

- [ant](https://ant.design/index-cn)
- [ApiDocs](https://quick-toolkit.github.io/ant-design-plus/)
- [GitRepository](https://github.com/quick-toolkit/ant-design-plus)

## Issues

Create [issues](https://github.com/quick-toolkit/ant-design-plus/issues) in this repository for anything related to the
ant-design-plus. When creating issues please search for existing issues to avoid duplicates.

## License

Licensed under the [MIT](https://github.com/quick-toolkit/ant-design-plus/blob/master/LICENSE) License.
