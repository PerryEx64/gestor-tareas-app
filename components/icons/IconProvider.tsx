import { Image } from 'react-native';

const IconProvider = (source: any) => ({
  toReactElement: ({ ...props }) => <Image {...props} source={source} />,
});

export const AssetIconsPack = {
  name: 'assets',
  icons: {
    task: IconProvider(require('../../assets/tasks_icon.png')),
    think: IconProvider(require('../../assets/icons/brain_think.png')),
    completed: IconProvider(require('../../assets/icons/brain_completed.png')),
    pending: IconProvider(require('../../assets/icons/brain_pending.png')),
    in_progress: IconProvider(
      require('../../assets/icons/brain_in_progress.png')
    ),
  },
};
