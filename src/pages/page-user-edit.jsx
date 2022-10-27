import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { createData, getData } from "../config/firestore";
import UpdateProfile from "../components/UserEdit/UpdateProfile";
import CameraUserEdit from "../components/UserEdit/CameraUserEdit";
import LocationUserData from "../components/UserEdit/LocationUserData";
import ProfileUserData from "../components/UserEdit/ProfileUserData";
import UserRegister from "../components/UserEdit/UserRegister";
import UserSignIn from "../components/UserEdit/UserSignIn";

const defaultCameraConfig = {
  active: false,
  cameraNumber: 0,
  imageDataUrl: undefined,
  devices: [],
};

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const defaultUserData = {
  name: "",
  position: "",
  description: "",
};

export default function PageUserEdit(props) {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [cameraData, setCameraData] = useState(defaultCameraConfig);
  const [userData, setUserData] = useState(defaultUserData);
  let load = 0;

  const webcamRef = React.useRef(null);

  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setCameraData(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setCameraData]
  );

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCameraData((prevState) => ({
      ...prevState,
      imageDataUrl: imageSrc,
    }));
  }, [webcamRef, setCameraData]);

  const getLocation = () => {
    try {
      const loc = navigator.geolocation;
      loc.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } catch (e) {
      alert("Location hardware or permission error");
    }
  };

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

  useEffect(() => {
    handleGetData();
  }, []);

  props = {
    ...props,
    handleUpdateData,
    userData,
    setUserData,
    cameraData,
    setCameraData,
    webcamRef,
    videoConstraints,
    capture,
    getLocation,
    location,
  };

  return (
    <>
      <div className="row">
        <ProfileUserData {...props} />
        <LocationUserData {...props} />
        <CameraUserEdit {...props} />
        <UpdateProfile {...props} />
        <UserRegister />
        <UserSignIn />
      </div>
    </>
  );
}
