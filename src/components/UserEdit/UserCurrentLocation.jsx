import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

const defaultProps = {
  center: {
    lng: 110.379,
    lat: -7.597,
  },
  zoom: 11
};

export default function UserCurrentLocation(props) {
  return (
    <div className="card card-style">
      <div className="content">
        <ComposableMap>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          <Marker coordinates={[110.379,-7.597]}>
            <circle r={8} fill="#F53" />
          </Marker>
        </ComposableMap>
      </div>
    </div>
  )
}
