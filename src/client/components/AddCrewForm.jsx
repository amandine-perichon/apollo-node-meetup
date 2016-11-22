import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class AddCrewForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      url: "",
      spacecraft: "galactica"
    }

    this.updateForm = this.updateForm.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  updateForm(field, update) {
    this.setState({
      [field]: update
    })
  }

  selectSpacecraft(spacecraft) {
    this.setState({
      spacecraft: spacecraft!=="All" ? spacecraft : null
    })
  }

  submitForm() {
    this.props.submit(this.state.name, this.state.url, this.state.spacecraft)
    this.setState({
      name: "",
      url: "",
      spacecraft: "galactica"
    })
  }

  render () {
    return (
      <div className='add-crew'>
        <label>Name: </label>
        <input type="text" value={this.state.name} name="name" onChange={evt => this.updateForm(evt.target.name, evt.target.value)} />
        <label>URL: </label>
        <input type="text" value={this.state.url} name="url" onChange={evt => this.updateForm(evt.target.name, evt.target.value)} />
        <br />
        <select value={this.state.value} onChange={evt => this.selectSpacecraft(evt.target.value)}>
          <option value="galactica">Galactica</option>
          <option value="zephir">Zephir</option>
          <option value="colonialOne">Colonial One</option>
        </select>
        <br />
        <button onClick={this.submitForm}>Add Crew</button>
      </div>
    )
  }
}

const AddCrew = gql`
  mutation addCrew ($name: String!, $url: String!, $spacecraft: Spacecraft!) {
    createCrew (
      name: $name,
      url: $url,
    	spacecraft: $spacecraft) {
      id
      name
      url
      spacecraft
    }
  }
`

export default graphql(AddCrew, {
  props: ({ mutate }) => ({
    submit: (name, url, spacecraft) => mutate(
      {
        variables: { name, url, spacecraft },
        updateQueries: {
            CrewListQuery: (prev, { mutationResult }) => {
              const newCrew = mutationResult.data.createCrew
              return {
                fleet: [ ...prev.fleet, newCrew]
              }
            },
          }
      }),
  }),
})(AddCrewForm)
