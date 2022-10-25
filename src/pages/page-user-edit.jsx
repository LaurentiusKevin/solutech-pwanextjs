import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { createData, getData } from "../config/firestore";

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

export default function PageUserEdit() {
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
      setUserData(r)
    });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-lg-4">
          <div className="card card-style">
            <img
              src={cameraData.imageDataUrl}
              className="img-fluid"
              id="profilePicture"
            />
            <div className="p-2">
              <p className="font-600 color-highlight mb-n2">{userData.position ?? 'Development'}</p>
              <h4 className="pt-2">{userData.name ?? 'Mr. Enabled'}</h4>
              <p className="mb-2">
                {userData.description ?? 'Husband and front end developer at Enabled.'}
              </p>
              <button
                id="changeProfilePict"
                type="button"
                className="btn btn-full btn-m gradient-highlight rounded-s font-13 font-600 mt-4"
              >
                Change Picture
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-4">
          <div className="card card-style">
            <div className="content">
              <p className="mb-n1 color-highlight font-600 font-12">Location</p>
              <h4 className="mb-4">Ambil lokasi saat ini</h4>

              <h6 id="locationError"></h6>
              <h6>Longitude: {location.longitude}</h6>
              <h6>Latitude: {location.latitude}</h6>

              <button
                className="btn btn-full btn-m gradient-highlight rounded-s font-13 font-600 mt-4"
                type="button"
                onClick={getLocation}
              >
                Get Location
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-4">
          <div className="card card-style">
            <div className="content">
              <p className="mb-n1 color-highlight font-600 font-12">Camera</p>
              <h4 className="mb-3">Capture Image</h4>

              <div className="input-style input-style-always-active has-borders no-icon mb-4">
                <label htmlFor="cameraDeviceList" className="color-highlight">
                  Camera List
                </label>
                <select>
                  <option value="default">Camera List</option>
                  {cameraData.devices?.map((item, key) => {
                    <option key={key} value={item.deviceId}>
                      {item.label} - Device {key + 1}
                    </option>;
                  })}
                </select>
                <span>
                  <i className="fa fa-chevron-down"></i>
                </span>
              </div>

              {cameraData.active === true && (
                <>
                  <Webcam
                    className="w-100"
                    screenshotFormat="image/jpeg"
                    audio={false}
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                  />
                  <button
                    className="btn btn-full btn-m gradient-brown rounded-s font-13 font-600 mt-4"
                    onClick={capture}
                  >
                    <FontAwesomeIcon icon={faCamera} size="lg" />
                  </button>
                </>
              )}

              <button
                type="button"
                className="btn btn-full btn-m gradient-highlight rounded-s font-13 font-600 mt-4"
                onClick={() => {
                  setCameraData((prevState) => ({
                    ...prevState,
                    active: !prevState.active,
                  }));
                }}
              >
                {cameraData.active === true ? "Stop Camera" : "Open Camera"}
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-4">
          <div className="card card-style">
            <div className="content">
              <p className="mb-n1 color-highlight font-600 font-12">
                Edit your Account
              </p>
              <h4>Basic Information</h4>
              <p>
                Public information that shows on top of your card in your
                profile page. This is just a dummy page.
              </p>

              <div className="mt-5 mb-3">
                <div className="input-style has-borders no-icon input-style-always-active validate-field mb-4">
                  <input
                    type="text"
                    className="form-control validate-name"
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        name: event.currentTarget?.value,
                      });
                    }}
                  />
                  <label htmlFor="form1" className="color-highlight">
                    Name
                  </label>
                </div>
                <div className="input-style has-borders no-icon input-style-always-active validate-field mb-4">
                  <input
                    type="text"
                    className="form-control validate-name"
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        position: event.currentTarget?.value,
                      });
                    }}
                  />
                  <label htmlFor="form1" className="color-highlight">
                    Position
                  </label>
                </div>
                <div className="input-style has-borders no-icon input-style-always-active validate-field mb-4">
                  <input
                    type="text"
                    className="form-control validate-name"
                    defaultValue={userData.description ?? ""}
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        description: event.currentTarget?.value,
                      });
                    }}
                  />
                  <label htmlFor="form1" className="color-highlight">
                    Descriptions
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-full btn-m gradient-highlight rounded-s font-13 font-600 mt-4"
                onClick={handleUpdateData}
              >
                Save Basic Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
