import nookies from "nookies";
import ProfileUserData from "../components/UserEdit/ProfileUserData";
import React, {useEffect, useState} from "react";
import CameraUserEdit from "../components/UserEdit/CameraUserEdit";
import {createData, getData} from "../config/firestore";
import UpdateProfile from "../components/UserEdit/UpdateProfile";
import {Button} from "reactstrap";

const defaultCameraConfig = {
  active: false,
  cameraNumber: 0,
  imageDataUrl: undefined,
  devices: [],
};

const defaultUserData = {
  name: "",
  position: "",
  description: "",
};

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function ProfilePage(props) {
  const [cameraData, setCameraData] = useState(defaultCameraConfig);
  const [userData, setUserData] = useState(defaultUserData);
  const [activeTab, setActiveTab] = useState('profile')

  const handleUpdateData = () => {
    createData("wR7xWHbJhiOusqLwvFAF", {
      ...userData,
    }).then((r) => {
      handleGetData();
    });
  };

  const handleGetData = () => {
    getData("wR7xWHbJhiOusqLwvFAF").then((r) => {
      setUserData(r);
    });
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCameraData((prevState) => ({
      ...prevState,
      imageDataUrl: imageSrc,
    }));
  }, [webcamRef, setCameraData]);

  useEffect(() => {
    handleGetData();
  }, []);

  props = {
    ...props,
    cameraData,
    setCameraData,
    userData,
    setUserData,
    handleGetData,
    handleUpdateData,
    webcamRef,
    videoConstraints,
    capture,
  }

  return (
    <div className="row">
      <div className="col-3 px-5">
        <div className="d-flex flex-column gap-2">
          <Button
            color={activeTab === 'profile' ? 'primary' : 'secondary'}
            onClick={(e) => {
              setActiveTab('profile')
            }}
          >Profile</Button>
          <Button
            color={activeTab === 'change-image' ? 'primary' : 'secondary'}
            onClick={(e) => {
              setActiveTab('change-image')
            }}
          >Change Image</Button>
          <Button
            color={activeTab === 'update-profile' ? 'primary' : 'secondary'}
            onClick={(e) => {
              setActiveTab('update-profile')
            }}
          >Update Profile</Button>
        </div>
      </div>
      <div className="col-9">
        <div className="row justify-content-center">
          {activeTab === 'profile' && <ProfileUserData {...props} />}
          {activeTab === 'change-image' && <CameraUserEdit {...props} />}
          {activeTab === 'update-profile' && <UpdateProfile {...props} />}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  if (cookies.accessToken === undefined) {
    return {
      redirect: {
        destination: "/auth/login",
      },
    };
  }

  return {
    props: {
      email: cookies.email,
      token: cookies.accessToken,
      uid: cookies.uid,
    },
  };
}
