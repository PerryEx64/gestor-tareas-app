import { forwardRef, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { BottomSheetTextInputProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';
import { useTheme } from '../hooks/useTheme';

interface BottomSheetInputProps extends Omit<
  BottomSheetTextInputProps,
  'style'
> {
  label?: string;
  caption?: string | ReactNode;
  status?: 'basic' | 'danger' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  multiline?: boolean;
  numberOfLines?: number;
}

export const BottomSheetInput = forwardRef<any, BottomSheetInputProps>(
  (props, ref) => {
    const {
      label,
      caption,
      status = 'basic',
      size = 'medium',
      multiline,
      numberOfLines,
      ...textInputProps
    } = props;
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const getInputStyle = () => {
      return [styles.input];
    };

    return (
      <View style={styles.container}>
        {label && (
          <Text
            category="label"
            style={[styles.label, { color: isDark ? '#8F9BB3' : '#222B45' }]}
          >
            {label}
          </Text>
        )}
        <BottomSheetTextInput
          ref={ref}
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#1A2138' : '#F7F9FC',
              borderColor: isDark ? '#101426' : '#E4E9F2',
              color: isDark ? '#8F9BB3' : '#222B45',
            },
          ]}
          multiline={multiline}
          placeholderTextColor="#8F9BB3"
          numberOfLines={multiline ? numberOfLines : 1}
          textAlignVertical={multiline ? 'top' : 'center'}
          {...textInputProps}
        />
        {caption && (
          <View style={styles.captionContainer}>
            {typeof caption === 'string' ? (
              <Text style={[styles.caption]}>{caption}</Text>
            ) : (
              caption
            )}
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  label: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '800',
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
  },
  inputLarge: {
    paddingVertical: 16,
    fontSize: 16,
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: 12,
  },
  inputDanger: {
    borderColor: '#FF708D',
    backgroundColor: '#FFF5F7',
  },
  captionContainer: {
    marginTop: 6,
  },
  caption: {
    fontSize: 12,
  },
  captionDanger: {
    color: '#FF708D',
  },
});
