import { Button } from './Button';
import { ButtonProps } from '@ui-kitten/components';

interface ChipProps {
  label: string;
  color: ButtonProps['status'];
  onPress?: () => void;
  selected?: boolean;
}
export const Chip = (props: ChipProps) => {
  const { label, onPress, selected, color = 'warning' } = props;

  return (
    <Button
      size="small"
      appearance={selected ? 'filled' : 'ghost'}
      status={selected ? color : 'basic'}
      onPress={onPress}
    >
      {label}
    </Button>
  );
};
