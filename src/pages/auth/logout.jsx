import nookies from "nookies";

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

  return {
    redirect: {
      destination: "/",
    },
  };
}
