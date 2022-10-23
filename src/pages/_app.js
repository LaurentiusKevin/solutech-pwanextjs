import React from "react";
import "../../styles/bootstrap.css";
import "../../styles/style.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  // const customScript = dynamic(() => import("../../public/scripts/custom"))

  pageProps = {
    ...pageProps,
    asPath,
  };

  return (
    <React.Fragment>
      <Component {...pageProps} />
      {/*<customScript />*/}
    </React.Fragment>
  );
}

export default MyApp;
