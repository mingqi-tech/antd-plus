# antd-plus
The `antd-plus` uses `ant@4.17` developed a react component.

## Installing

```shell
# ant库
npm i antd @mingqi/rc-router-dom @quicker-js/class-decorator @quicker-js/class-transformer @quicker-js/http @mingqi/antd-plus
#or
yarn add @mingqi/rc-router-dom @quicker-js/class-decorator @quicker-js/class-transformer @quicker-js/http @mingqi/antd-plus
```

[@mingqi/rc-router-dom](https://mingqi-tech.github.io/rc-router-dom/) 提供路由解析和提供路由的上下文信息， [@quicker-js/class-decorator](https://quicker-js.github.io/class-decorator/) 提供类装饰器映射，[@quicker-js/class-transformer](https://quicker-js.github.io/class-transformer/) 提供实例转换功能，
[@quicker-js/http](https://quicker-js.github.io/http/) 提供在发起http请求时根据装饰器注解的信息自动请求


## Example Usage

- PlusForm Component
Your must before create [http](https://quicker-js.github.io/http/) instance and use [PlusConfigProvider](https://mingqi-tech.github.io/antd-plus/modules.html#PlusConfigProvider)
provide http

```ts
// http.ts
import { HttpClient } from '@quicker-js/http';
import qs from 'qs';
import { Modal } from 'antd';

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
import { http } from './http';
export function App() {
    return (
        <PlusConfigProvider value={{ http }}>
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
import { Prop } from '@quicker-js/class-transformer';
import { ApiProperty } from '@quicker-js/http';

export class LoginResponseDto {
  /**
   * 访问token
   */
  @ApiProperty({ description: '访问token', type: 'object' })
  @Prop.default
  public accessToken: string;

  /**
   * 账户ID
   */
  @ApiProperty({ description: '账户ID', type: 'object' })
  @Prop.default
  public accountId: string;

  /**
   * 权限列表
   */
  @ApiProperty({ description: '权限列表', type: 'object' })
  @Prop({
    type: String,
  })
  public authorities: string[];

  /**
   * 姓名
   */
  @ApiProperty({ description: '姓名', type: 'object' })
  @Prop.default
  public name: string;

  /**
   * 账户名称
   */
  @ApiProperty({ description: '账户名称', type: 'object' })
  @Prop.default
  public username: string;

  /**
   * 唯一标识uuid
   */
  @ApiProperty({ description: '唯一标识uuid', type: 'object' })
  @Prop.default
  public uuid: string;
}

```
```ts
/**
 * api/http-resource.ts
 * @class HttpResource
 */
import { CaptchaImageDto } from './captcha-image-dto';
import { LoginResponseDto } from './login-response-dto';
import { Prop, Scene } from '@quicker-js/class-transformer';
import { ApiProperty } from '@quicker-js/http';

export class HttpResource<T> {
    @ApiProperty({ type: 'string' })
    @Prop.default
    public code: string;

    @Prop({
        scenes: Scene.from(
            {
                type: CaptchaImageDto,
                value: 'HttpResource<CaptchaImageDto>',
            },
            {
                type: LoginResponseDto,
                value: 'HttpResource<LoginResponseDto>',
            }
        ),
    })
    public data: T;

    @ApiProperty({ type: 'string' })
    @Prop.default
    public message: string;

    @ApiProperty({ type: 'boolean' })
    @Prop.default
    public ok: boolean;
}

```
```ts
/**
 * 用户登陆验证
 * api/post-auth-login.ts
 * @class PostAuthLogin
 */
import { Prop } from '@quicker-js/class-transformer';
import { ApiProperty, ApiRequest } from '@quicker-js/http';
import { HttpResource } from './http-resource';

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
    @ApiProperty({ in: 'query', type: 'string', description: '账户密码' })
    @Prop.default
    public password?: string;

    /**
     * 账户名称
     */
    @ApiProperty({ in: 'query', type: 'string', description: '账户名称' })
    @Prop.default
    public username?: string;

    /**
     * 图片验证码uuid
     */
    @ApiProperty({ in: 'query', type: 'string', description: '图片验证码uuid' })
    @Prop.default
    public uuid?: string;

    /**
     * 验证码
     */
    @ApiProperty({ in: 'query', type: 'string', description: '验证码' })
    @Prop.default
    public verifyCode?: string;
}

```
```tsx
import { Button, Input, Layout, Typography } from 'antd';
import { PostAuthLogin } from './post-auth-login';
import { PlusForm } from '@mingqi/antd-plus';
import {
    EyeInvisibleOutlined,
    EyeOutlined,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { HttpResource } from '../../../../api/http-resource';

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
                        <Input addonBefore={<UserOutlined />} />
                    </PlusForm.Item>
                    <PlusForm.Item name="password">
                        <Input
                            addonBefore={<LockOutlined />}
                            type={type}
                            suffix={
                                type === 'text' ? (
                                    <EyeOutlined onClick={() => setType('password')} />
                                ) : (
                                    <EyeInvisibleOutlined onClick={() => setType('text')} />
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

## Documentation
- [ant](https://ant.design/index-cn)
- [ApiDocs](https://mingqi-tech.github.io/antd-plus/)
- [GitRepository](https://github.com/mingqi-tech/antd-plus)


## Issues
Create [issues](https://github.com/mingqi-tech/antd-plus/issues) in this repository for anything related to the antd-plus. When creating issues please search for existing issues to avoid duplicates.


## License
Licensed under the [MIT](https://github.com/mingqi-tech/antd-plus/blob/master/LICENSE) License.
