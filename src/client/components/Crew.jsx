import React, { PropTypes } from 'react'

 const Crew = ({name, url, spacecrafts}) => (
  <div>
    <div>
      <img src={url} />
    </div>
    <div>{name}</div>
    <div>{spacecrafts.join(", ")}</div>
  </div>
)

Crew.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  spacecrafts: PropTypes.array
}

export default Crew
