import UserSignIn from "../../components/UserEdit/UserSignIn";
import nookies, {setCookie} from "nookies";
import {authSignIn} from "../../config/firebase-auth";
import {useRouter} from "next/router";

export default function AuthLogin(props) {
  const router = useRouter()

  const onSubmit = (data) => {
    authSignIn(data)
      .then((r) => {
        console.log(r.user,r.user.accessToken,r.user.uid)
        setCookie(null, 'email', r.user.email, {path: '/'})
        setCookie(null, 'accessToken', r.user.accessToken, {path: '/'})
        setCookie(null, 'uid', r.user.uid, {path: '/'})
        router.push('/')
      })
      .catch((e) => {
        if (e.code === "auth/email-already-in-use") {
        }
      });
  };

  return (
    <>
      <div className="row justify-content-center">
        <UserSignIn
          onSubmit={onSubmit}
        />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(null)

  if (cookies.email) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }

  return {
    props: {}
  }
}
