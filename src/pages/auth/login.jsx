import UserSignIn from "../../components/UserEdit/UserSignIn";
import nookies, { setCookie } from "nookies";
import { authSignIn } from "../../config/firebase-auth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AuthLogin(props) {
  const router = useRouter();
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const onSubmit = (data) => {
    setLoginErrorMessage("");
    authSignIn(data)
      .then((r) => {
        setCookie(null, "email", r.user.email, { path: "/" });
        setCookie(null, "accessToken", r.user.accessToken, { path: "/" });
        setCookie(null, "uid", r.user.uid, { path: "/" });
        router.push("/");
      })
      .catch((e) => {
        switch (e.code) {
          case "auth/wrong-password":
            setLoginErrorMessage("Wrong email or password");
            break;

          default:
            setLoginErrorMessage("There is something wrong with the server!");
            break;
        }
      });
  };

  return (
    <>
      <div className="row justify-content-center">
        <UserSignIn
          onSubmit={onSubmit}
          loginErrorMessage={loginErrorMessage}
          setLoginErrorMessage={setLoginErrorMessage}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  if (cookies.email) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}
