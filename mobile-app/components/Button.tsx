import {
  Button as UIButton,
  ButtonProps as UIButtonProps,
  Spinner,
} from '@ui-kitten/components';

export interface ButtonProps extends Omit<UIButtonProps, 'style'> {
  isLoading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { isLoading, ...restProps } = props;
  return (
    <UIButton
      {...restProps}
      style={{ borderRadius: 15 }}
      disabled={isLoading}
      accessoryRight={
        isLoading ? (
          <Spinner status={restProps.status ?? 'primary'} />
        ) : undefined
      }
    />
  );
};
