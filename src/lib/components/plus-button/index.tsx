import { useState } from 'react';
import { Button, ButtonProps } from 'antd';

/**
 * PlusButton
 * @param props
 * @constructor
 */
export function PlusButton(props: Omit<ButtonProps, 'loading'>) {
  const { onClick, ...rest } = props;
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Button
      disabled={loading}
      {...rest}
      onClick={async (e) => {
        try {
          if (onClick) {
            setLoading(true);
            // eslint-disable-next-line @typescript-eslint/await-thenable
            await onClick(e);
            setLoading(false);
          }
        } catch (e) {
          setLoading(false);
        }
      }}
    />
  );
}

export type PlusButtonProps = Omit<ButtonProps, 'loading'>;
