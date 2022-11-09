export default function UpdateProfile(props) {
  const { userData, setUserData, handleUpdateData } = props;

  return (
    <div className="col-sm-12 col-lg-5">
      <div className="card card-style">
        <div className="content">
          <p className="mb-n1 color-highlight font-600 font-12">
            Edit your Account
          </p>
          <h4>Basic Information</h4>
          <p>
            Public information that shows on top of your card in your profile
            page. This is just a dummy page.
          </p>

          <div className="mt-5 mb-3">
            <div className="input-style has-borders no-icon input-style-always-active validate-field mb-4">
              <input
                type="text"
                className="form-control validate-name"
                defaultValue={userData?.name ?? ""}
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
              <select type="text"
                      className="form-control validate-name"
                      defaultValue={userData?.gender ?? ""}
                      onChange={(event) => {
                        setUserData({
                          ...userData,
                          gender: event.currentTarget?.value,
                        });
                      }}>
                <option>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label htmlFor="form1" className="color-highlight">
                Gender
              </label>
            </div>
            <div className="input-style has-borders no-icon input-style-always-active validate-field mb-4">
              <input
                  type="text"
                  className="form-control validate-name"
                  defaultValue={userData?.phone ?? ""}
                  onChange={(event) => {
                    setUserData({
                      ...userData,
                      phone: event.currentTarget?.value,
                    });
                  }}
              />
              <label htmlFor="form1" className="color-highlight">
                Phone
              </label>
            </div>
            <div className="input-style has-borders no-icon input-style-always-active validate-field mb-4">
              <input
                type="text"
                className="form-control validate-name"
                defaultValue={userData?.position ?? ""}
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
              <textarea
                  type="text"
                  className="form-control validate-name"
                  defaultValue={userData?.address ?? ""}
                  onChange={(event) => {
                    setUserData({
                      ...userData,
                      address: event.currentTarget?.value,
                    });
                  }}
              />
              <label htmlFor="form1" className="color-highlight">
                Address
              </label>
            </div>
            <div className="input-style has-borders no-icon input-style-always-active validate-field mb-4">
              <input
                type="text"
                className="form-control validate-name"
                defaultValue={userData?.description ?? ""}
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
  );
}
