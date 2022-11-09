import nookies from "nookies";
import {authSignOut} from "../../config/firebase-auth";

export default function AuthLogout() {
  return <></>;
}

export async function getServerSideProps(context) {
  nookies.destroy(context, "accessToken", {
    path: "/",
  });
  nookies.destroy(context, "email", {
    path: "/",
  });
  nookies.destroy(context, "uid", {
    path: "/",
  });

  let data = authSignOut()

  return {
    redirect: {
      destination: "/",
    },
  };
}
