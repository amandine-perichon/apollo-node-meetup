import React, { Component } from 'react'
import CrewList from './CrewList'
import AddCrewForm from './AddCrewForm'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      spacecraft: null,
      name: "",
      url: "",
    }

    this.selectSpacecraft = this.selectSpacecraft.bind(this)
    this.updateForm = this.updateForm.bind(this)
  }

  selectSpacecraft(spacecraft) {
    this.setState({
      spacecraft: spacecraft!=="All" ? spacecraft : null
    })
  }

  updateForm(field, update) {
    console.log(field, update)
    this.setState({
      [field]: update
    })
  }

  render () {
    return (
      <div className="container">
        <h3>Add a crew member</h3>
        <AddCrewForm />
        <h3>Crew member list</h3>
        <div className="crew-list">
          <select value={this.state.value} onChange={evt => this.selectSpacecraft(evt.target.value)}>
            <option value="All">All</option>
            <option value="galactica">Galactica</option>
            <option value="zephir">Zephir</option>
            <option value="colonialOne">Colonial One</option>
          </select>
          <CrewList
            spacecraft={this.state.spacecraft}
          />
        </div>
      </div>
    )
  }
}

export default App
