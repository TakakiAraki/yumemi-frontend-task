import App from "next/app";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "reset-css/sass/_reset.scss";
import { is } from "../utils/Is";

const queryClient = new QueryClient();

export default class Wrap extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <QueryClientProvider client={queryClient}>
        {is.isDevelopment ? <ReactQueryDevtools initialIsOpen /> : null}
        <Component {...pageProps} />
      </QueryClientProvider>
    );
  }
}
