import nookies from "nookies";

export default function AuthLogout() {
  return (
    <></>
  )
}

export async function getServerSideProps(context) {
  nookies.destroy(null, 'accessToken',{
    path: '/'
  });
  nookies.destroy(null, 'email',{
    path: '/'
  });
  nookies.destroy(null, 'uid',{
    path: '/'
  });

  return {
    redirect: {
      destination: '/'
    }
  }
}
