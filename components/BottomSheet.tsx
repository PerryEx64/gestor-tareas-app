import React, { ReactNode, useEffect, useRef } from 'react';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSheetProps {
  children: ReactNode;
  name?: string;
  isOpen: boolean;
  onOpen: (isOpen: boolean) => void;
  targetSnapPoint?: number;
  snapPoints: string[];
}
export const BottomSheet = (props: BottomSheetProps) => {
  const { children, name, onOpen, snapPoints, targetSnapPoint, isOpen } = props;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isOpen]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      name={name ?? 'BottomSheet'}
      stackBehavior="replace"
      enablePanDownToClose={false}
      index={targetSnapPoint ?? 0}
      snapPoints={snapPoints}
      bottomInset={bottom}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          onPress={() => onOpen(false)}
        />
      )}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheetModal>
  );
};
