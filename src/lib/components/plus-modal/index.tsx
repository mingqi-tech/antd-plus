import { Modal, ModalProps } from 'antd';
import { ReactNode, useState } from 'react';

/**
 * PlusModal
 * @param props
 * @constructor
 */
export function PlusModal(props: PlusModalProps) {
  const { onOk, confirmLoading, ...rest } = props;
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Modal
      maskClosable={false}
      destroyOnClose
      {...rest}
      confirmLoading={loading || confirmLoading}
      onOk={async (e) => {
        try {
          if (onOk) {
            setLoading(true);
            // eslint-disable-next-line @typescript-eslint/await-thenable
            await onOk(e);
            setLoading(false);
          }
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            console.log(e);
          }
        }
      }}
    />
  );
}

export interface PlusModalProps extends ModalProps {
  children?: ReactNode;
}
