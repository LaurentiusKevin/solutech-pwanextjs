import React, {useState} from "react";
import Webcam from "react-webcam";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";

const defaultCameraConfig = {
  active: false,
  cameraNumber: 0,
  imageDataUrl: undefined,
  devices: []
}

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

export default function PageUserEdit() {
  const [location, setLocation] = useState({latitude: 0, longitude: 0})
  const [cameraData, setCameraData] = useState(defaultCameraConfig)

  const webcamRef = React.useRef(null);

  const handleDevices = React.useCallback(
    mediaDevices =>
      setCameraData(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setCameraData]
  );

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setCameraData(prevState => ({
        ...prevState,
        imageDataUrl: imageSrc
      }))
    },
    [webcamRef, setCameraData]
  );

  const getLocation = () => {
    try {
      const loc = navigator.geolocation
      loc.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      })
    } catch (e) {
      alert("Location hardware or permission error")
    }
  }

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
              <p className="font-600 color-highlight mb-n2">Development</p>
              <h4 className="pt-2">Mr. Enabled</h4>
              <p className="mb-2">
                Husband and front end developer at Enabled.
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
              <h6>
                Longitude: {location.longitude}
              </h6>
              <h6>
                Latitude: {location.latitude}
              </h6>

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
                <label htmlFor="cameraDeviceList" className="color-highlight">Camera List</label>
                <select>
                  <option value="default">Camera List</option>
                  {cameraData.devices?.map((item, key) => {
                    <option key={key} value={item.deviceId}>{item.label} - Device {key + 1}</option>
                  })}
                </select>
                <span><i className="fa fa-chevron-down"></i></span>
              </div>

              {cameraData.active === true &&
                <>
                  <Webcam
                    className="w-100"
                    screenshotFormat="image/jpeg"
                    audio={false}
                    // ref={webcamRef}
                    videoConstraints={videoConstraints}
                  />
                  <button
                    className="btn btn-full btn-m gradient-brown rounded-s font-13 font-600 mt-4"
                    // onClick={capture}
                  >
                    <FontAwesomeIcon icon={faCamera} size="lg" />
                  </button>
                </>
              }

              <button
                type="button"
                className="btn btn-full btn-m gradient-highlight rounded-s font-13 font-600 mt-4"
                onClick={() => {
                  setCameraData(prevState => ({
                    ...prevState,
                    active: !prevState.active
                  }))
                }}
              >
                {cameraData.active === true ? 'Stop Camera' : 'Open Camera'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
