import {
  Input as UIInput,
  InputProps as UIInputProps,
} from '@ui-kitten/components';

interface InputProps extends Omit<UIInputProps, 'style'> {}

export const Input = (props: InputProps) => {
  return <UIInput {...props} style={{ borderRadius: 15 }} />;
};
