import App from "next/app";
import React from "react";
import "reset-css/sass/_reset.scss";
import "./_app.scss";
import "~/styles/colors.scss";

export default class Wrap extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <div className="theme-white">
        <Component {...pageProps} />
      </div>
    );
  }
}
