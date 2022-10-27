import Webcam from "react-webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export default function CameraUserEdit(props) {
  const { cameraData, setCameraData, webcamRef, videoConstraints, capture } =
    props;

  return (
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
                return (
                  <option key={key} value={item.deviceId.toString()}>
                    {item.label} - Device {key + 1}
                  </option>
                );
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
  );
}
