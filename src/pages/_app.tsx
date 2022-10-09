import App from "next/app";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "reset-css/sass/_reset.scss";
import "./_app.scss";
import "~/styles/colors.scss";
import { is } from "~/utils/Is";

const queryClient = new QueryClient();

export default class Wrap extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <div className="theme-white">
        <QueryClientProvider client={queryClient}>
          {is.development ? <ReactQueryDevtools initialIsOpen /> : null}
          <Component {...pageProps} />
        </QueryClientProvider>
      </div>
    );
  }
}
