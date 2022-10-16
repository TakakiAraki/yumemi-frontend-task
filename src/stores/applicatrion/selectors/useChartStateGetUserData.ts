import { useApplicationSelector } from "../store";

export default () => {
  return useApplicationSelector((state) => {
    return state.userData.resource;
  });
};
