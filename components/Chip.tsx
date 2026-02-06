import { Button } from './Button';
import { ButtonProps, Icon } from '@ui-kitten/components';

interface ChipProps {
  label: string;
  color: ButtonProps['status'];
  onPress?: () => void;
  selected?: boolean;
  icon?: string;
}
export const Chip = (props: ChipProps) => {
  const { label, onPress, selected, color = 'warning', icon } = props;

  return (
    <Button
      size="small"
      appearance={selected ? 'filled' : 'ghost'}
      status={selected ? color : 'basic'}
      onPress={onPress}
      accessoryLeft={(props) => {
        return icon ? <Icon {...props} name={icon} pack="assets" /> : <></>;
      }}
    >
      {label}
    </Button>
  );
};
