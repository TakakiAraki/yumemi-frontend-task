import App from "next/app";
import React from "react";
import "reset-css/sass/_reset.scss";

export default class Wrap extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <div>
        <Component {...pageProps} />
      </div>
    );
  }
}
