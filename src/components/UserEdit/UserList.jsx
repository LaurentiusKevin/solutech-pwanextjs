export default function UserList(props) {
  const {
    allUserData,
    handleSetAdmin,
  } = props;
  return (
    <div className="col-12">
      {allUserData.length === 0 && (
        <div className="card card-style bg-fade-blue-light">
          <div className="content">
            <h4>Data user tidak tersedia</h4>
          </div>
        </div>
      )}
      <div className="row">
        {allUserData?.map((item, key) => (
          <div key={`user-list-${key}`} className="col-md-6">
            <div className="card card-style">
              <div className="content">
                <p className="mb-n1 color-highlight font-600 font-12">
                  {item.position ?? "- no position -"}
                </p>
                <h4>{item.name ?? "- no name -"}</h4>
                <p>{item.email ?? "- no email -"}</p>
                <p>{item.description ?? "- no description -"}</p>
                {item.isAdmin !== true && (
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-s btn-info"
                      onClick={e => {
                        handleSetAdmin(item.uid, {
                          ...item,
                          isAdmin: true
                        })
                      }}
                    >Set as Admin</button>
                  </div>
                )}
                {item.isAdmin === true && (
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-s btn-danger"
                      onClick={e => {
                        handleSetAdmin(item.uid, {
                          ...item,
                          isAdmin: false
                        })
                      }}
                    >Remove Admin</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
