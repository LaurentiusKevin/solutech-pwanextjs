import { useState } from "react";
import {register} from "../../config/firebase-auth";

export default function UserRegister(props) {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleUpdateData = () => {
    console.log(userData);
    register(userData).then(r => {
      console.log(r)
    })
  };

  return (
    <div className="col-sm-12 col-lg-4">
      <div className="card card-style">
        <div className="content">
          <p className="mb-n1 color-highlight font-600 font-12">
            Register Account
          </p>
          <h4>Firebase Authentication</h4>
          <p>Register using email and password</p>

          <div className="mt-5 mb-3">
            <div className="input-style has-borders no-icon input-style-always-active validate-field mb-4">
              <input
                type="text"
                className="form-control validate-name"
                defaultValue={userData.email}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    email: event.currentTarget?.value,
                  });
                }}
              />
              <label htmlFor="form1" className="color-highlight">
                Email
              </label>
            </div>
            <div className="input-style has-borders no-icon input-style-always-active validate-field mb-4">
              <input
                type="password"
                className="form-control validate-name"
                defaultValue={userData.password}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    password: event.currentTarget?.value,
                  });
                }}
              />
              <label htmlFor="form1" className="color-highlight">
                Password
              </label>
            </div>

            <button
              type="button"
              className="btn btn-full btn-m gradient-highlight rounded-s font-13 font-600 mt-4"
              onClick={handleUpdateData}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
