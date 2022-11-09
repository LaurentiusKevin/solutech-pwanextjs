import nookies, { setCookie } from "nookies";
import UserRegister from "../../components/UserEdit/UserRegister";
import { authRegister } from "../../config/firebase-auth";
import { useRouter } from "next/router";
import {createData} from "../../config/firestore";

export default function AuthLogin(props) {
  const router = useRouter();
  const onSubmit = (data) => {
    authRegister(data)
      .then((r) => {
        createData(r.user.uid, {
          email: r.user.email
        }).then(r => {
          alert("User registered")
          router.push("/auth/login");
        })
      })
      .catch((e) => {
        alert("Something wrong")
      });
  };

  return (
    <>
      <div className="row justify-content-center">
        <UserRegister onSubmit={onSubmit} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  if (cookies.accessToken) {
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
