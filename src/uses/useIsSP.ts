import { useMedia } from "react-use";
import { MEDIA } from "~/constants/style";

export const useIsSP = () => {
  return useMedia(MEDIA.IS_SP);
};
