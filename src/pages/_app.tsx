import App from "next/app";
import React from "react";
import "reset-css/sass/_reset.scss";
import "./_app.scss";
import "~/styles/colors.scss";
import { Provider } from "react-redux";
import { store } from "~/stores/applicatrion/store";

export default class Wrap extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <div className="theme-white">
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </div>
    );
  }
}
