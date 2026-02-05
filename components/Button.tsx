import {
  Button as UIButton,
  ButtonProps as UIButtonProps,
} from '@ui-kitten/components';

export interface ButtonProps extends Omit<UIButtonProps, 'style'> {}

export const Button = (props: ButtonProps) => {
  return <UIButton {...props} style={{ borderRadius: 15 }} />;
};
