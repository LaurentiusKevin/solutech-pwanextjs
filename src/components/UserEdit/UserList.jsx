export default function UserList(props) {
  const {
    allUserData
  } = props
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
                  {item.position ?? '- no position -'}
                </p>
                <h4>{item.name}</h4>
                <p>
                  {item.description ?? '- no description -'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
