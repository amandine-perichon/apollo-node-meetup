import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import getName from '../../util'
import Crew from './Crew'

const CrewList = ({data: {fleet, loading, refresh}}) => {
  const crewList = fleet ? fleet.map(crew => <Crew
                                              key={crew.id}
                                              name={crew.name}
                                              url={crew.url}
                                              spacecraft={getName(crew.spacecraft)}
                                              />) : null
  return loading? <div className="loader"></div> : <div>{crewList}</div>
}

const CrewListQuery = gql`
  query CrewListQuery ($spacecraft: Spacecraft) {
    fleet (spacecraft: $spacecraft) {
      id
      name
      url
      spacecraft
    }
  }
`

export default graphql(CrewListQuery, {
  options: ({ spacecraft }) => ({ variables: { spacecraft } }),
})(CrewList)
