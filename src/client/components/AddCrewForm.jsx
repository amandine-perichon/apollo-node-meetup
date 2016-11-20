import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class AddCrewForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      url: "",
      spacecrafts: ["Galactica", "Zephir"]
    }

    this.updateForm = this.updateForm.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  updateForm(field, update) {
    this.setState({
      [field]: update
    })
  }

  submitForm() {
    this.props.submit(this.state.name, this.state.url)
    this.setState({
      name: "",
      url: ""
    })
  }

  render () {
    return (
      <div className='add-crew'>
        <label>
          Name:
          <input type="text" value={this.state.name} name="name" onChange={evt => this.updateForm(evt.target.name, evt.target.value)} />
        </label>
        <label>
          URL:
          <input type="text" value={this.state.url} name="url" onChange={evt => this.updateForm(evt.target.name, evt.target.value)} />
        </label>
        <button onClick={this.submitForm}>Add Crew</button>
      </div>
    )
  }
}

const AddCrew = gql`
  mutation addCrew ($name: String!, $url: String!) {
    createCrew (
      name: $name,
      url: $url,
    	spacecrafts: [galactica]) {
      id
      name
      url
      spacecrafts
    }
  }
`

export default graphql(AddCrew, {
  props: ({ mutate }) => ({
    submit: (name, url) => mutate(
      {
        variables: { name, url },
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
