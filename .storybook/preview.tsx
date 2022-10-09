import "reset-css/sass/_reset.scss";
import "pages/_app.scss";
import "styles/colors.scss";
import React from "react";

const withChakra = (StoryFn: Function) => {
  return (
    <div className="theme-white">
      <StoryFn />
    </div>
  );
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
export const decorators = [withChakra];
