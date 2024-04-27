declare module 'react-native-manage-wallpaper' {
  export function setWallpaper(
    options: { uri: string },
    callback: (res: string) => void,
    type: TYPE
  ): void;

  export enum TYPE {
    HOME,
    LOCK,
    BOTH,
  }
}