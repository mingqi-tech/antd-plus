## Example Usage

- /src/models/desc-and-example.ts

```ts
import { ApiProperty } from '@quicker-js/http';
import { Typed } from '@quicker-js/class-transformer';

@ApiRequest({
    url: '/newStoreConfig/insert',
    method: 'post',
    description: '添加示例',
    scene: 'ResponseResult',
    response: ResponseResult,
})
export class DescAndExample {
    @ApiProperty({
        type: 'string',
        required: true,
        description: '示例',
    })
    @Typed()
    public imgUrlExample: string;

    @ApiProperty({
        type: 'string',
        required: true,
        description: '描述',
    })
    @Typed()
    public installation: string;
}
```

- /src/controllers/app/index.ts
```tsx
import {DescAndExample} from '../../models/desc-and-example'
import {Input} from "antd";

export default () => {
    const [form] = Form.useForm<DescAndExample>()
    return (
        <PlusForm
            form={form}
            model={DescAndExample}
        >
            <PlusForm.Item name="imgUrlExample">
                <Input />
            </PlusForm.Item>

            <PlusForm.Item name="installation">
                <Input />
            </PlusForm.Item>
        </PlusForm>
    )
}
```