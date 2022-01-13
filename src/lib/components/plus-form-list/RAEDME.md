## Example Usage


- /src/models/desc-and-examples.ts

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
export class DescAndExamples {
  @ApiProperty({
    type: 'string',
    required: true,
    description: '示例列表',
  })
  @Typed()
  public descAndExamples: DescAndExample;
}
```

- /src/models/desc-and-example.ts

```ts
import { ApiProperty } from '@quicker-js/http';
import { Typed } from '@quicker-js/class-transformer';

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
import {PlusForm} from "./index";

export default () => {
    const [form] = Form.useForm<DescAndExample>()
    return (
        <PlusForm
            form={form}
            model={DescAndExamples}
        >
            <PlusForm.List
                name="descAndExamples"
                model={DescAndExample}
                initialValue={[{}]}
                renderAfter={(operation) => (
                    <Button type="primary" onClick={() => operation.add({})}>
                        添加
                    </Button>
                )}
                renderItem={(index, operation, fields) => (
                    <Card
                        style={{
                            marginBottom: 10,
                        }}
                        title="示例（添加描述和示例图片）"
                        size="small"
                        extra={[
                            <Button
                                hidden={fields.length === 1}
                                type="link"
                                size="small"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                    operation.remove();
                                }}
                            />,
                        ]}
                    >
                        <PlusForm.Item index={index} name="installation">
                            <Input />
                        </PlusForm.Item>

                        <PlusForm.Item index={index} name="imgUrlExample">
                            <Input />
                        </PlusForm.Item>
                    </Card>
                )}
            />
        </PlusForm>
    )
}
```

## API

| 名称           | 描述                                 |
|--------------|------------------------------------|
| name         | String                             |
| renderItem   | (index, operation, fields) => void |
| renderAfter  | () => void                         |
| renderBefore | () => void                         |
