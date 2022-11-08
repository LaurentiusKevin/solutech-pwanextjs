import nookies from "nookies";
import ProfileUserData from "../components/UserEdit/ProfileUserData";
import React, { useEffect, useState } from "react";
import CameraUserEdit from "../components/UserEdit/CameraUserEdit";
import { createData, getAllData, getData } from "../config/firestore";
import UpdateProfile from "../components/UserEdit/UpdateProfile";
import { Button } from "reactstrap";
import UserList from "../components/UserEdit/UserList";
import { uploadImage } from "../config/firebase-storage";

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
  const [activeTab, setActiveTab] = useState("profile");
  const [allUserData, setAllUserData] = useState([]);

  const handleUpdateData = () => {
    createData(props.uid, userData).then((r) => {
      handleGetData();
    });
  };

  const handleGetData = () => {
    getData(props.uid).then((r) => {
      if (r !== undefined) {
        setUserData(r);
      }
    });
  };

  const handleGetAllData = () => {
    getAllData().then((r) => {
      if (r !== undefined) {
        let tampung = [];
        r.forEach((item) => {
          tampung.push({
            email: item.data().email ?? null,
            name: item.data().name ?? null,
            description: item.data().description ?? null,
            position: item.data().position ?? null,
          });
        });
        setAllUserData(tampung);
      }
    });
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    uploadImage(imageSrc).then((snapshot) => {
      console.log(snapshot);
      alert("profile image uploaded");
    });
    setCameraData((prevState) => ({
      ...prevState,
      imageDataUrl: imageSrc,
    }));
  }, [webcamRef, setCameraData]);

  useEffect(() => {
    handleGetData();
    setUserData({
      ...userData,
      email: props.email,
    });
  }, []);

  useEffect(() => {
    switch (activeTab) {
      case "user-management":
        handleGetAllData();
        break;
    }
  }, [activeTab]);

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
    allUserData,
    setAllUserData,
  };

  return (
    <div className="row">
      <div className="col-md-3 px-5">
        <div className="d-flex flex-column gap-2">
          <Button
            color={activeTab === "profile" ? "primary" : "secondary"}
            onClick={(e) => {
              setActiveTab("profile");
            }}
          >
            Profile
          </Button>
          <Button
            color={activeTab === "change-image" ? "primary" : "secondary"}
            onClick={(e) => {
              setActiveTab("change-image");
            }}
          >
            Change Image
          </Button>
          <Button
            color={activeTab === "update-profile" ? "primary" : "secondary"}
            onClick={(e) => {
              setActiveTab("update-profile");
            }}
          >
            Update Profile
          </Button>
          <Button
            color={activeTab === "user-management" ? "primary" : "secondary"}
            onClick={(e) => {
              setActiveTab("user-management");
            }}
          >
            User List
          </Button>
        </div>
      </div>
      <div className="col-md-9">
        <div className="row justify-content-center">
          {activeTab === "profile" && <ProfileUserData {...props} />}
          {activeTab === "change-image" && <CameraUserEdit {...props} />}
          {activeTab === "update-profile" && <UpdateProfile {...props} />}
          {activeTab === "user-management" && <UserList {...props} />}
        </div>
      </div>
    </div>
  );
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
