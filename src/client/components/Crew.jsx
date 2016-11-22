import React, { PropTypes } from 'react'

 const Crew = ({name, url, spacecraft}) => (
  <div className="crew">
    <div className="crew-picture">
      <img src={url} />
    </div>
    <div className="crew-description">
    <div className="crew-name">{name}</div>
    <div className="crew-spacecraft">{spacecraft}</div>
    </div>
  </div>
)

Crew.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  spacecraft: PropTypes.string
}

export default Crew
