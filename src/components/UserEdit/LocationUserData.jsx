export default function LocationUserData(props) {
  const {
    getLocation,
    location,
  } = props

  return (
    <div className="col-sm-12 col-lg-4">
      <div className="card card-style">
        <div className="content">
          <p className="mb-n1 color-highlight font-600 font-12">Location</p>
          <h4 className="mb-4">Ambil lokasi saat ini</h4>

          <h6 id="locationError"></h6>
          <h6>Longitude: {location?.longitude}</h6>
          <h6>Latitude: {location?.latitude}</h6>

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
  )
}
