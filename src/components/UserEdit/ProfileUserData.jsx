export default function ProfileUserData(props) {
  const { cameraData, userData } = props;

  return (
    <div className="col-sm-12 col-lg-5">
      <div className="card card-style">
        <img
          src={cameraData.imageDataUrl}
          className="img-fluid"
          id="profilePicture"
          alt="profile image"
        />
        <div className="p-2">
          <p className="font-600 color-highlight mb-n2">
            {userData.position ?? "Development"}
          </p>
          <h4 className="pt-2">{userData.name ?? "Mr. Enabled"}</h4>
          <p className="mb-2">
            {userData.description ??
              "Husband and front end developer at Enabled."}
          </p>
          {/*<button*/}
          {/*  id="changeProfilePict"*/}
          {/*  type="button"*/}
          {/*  className="btn btn-full btn-m gradient-highlight rounded-s font-13 font-600 mt-4"*/}
          {/*>*/}
          {/*  Change Picture*/}
          {/*</button>*/}
        </div>
      </div>
    </div>
  );
}
