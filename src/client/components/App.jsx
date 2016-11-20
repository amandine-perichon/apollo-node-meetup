import React, { Component } from 'react'
import CrewList from './CrewList'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      spacecraft: null
    }

    this.selectSpacecraft = this.selectSpacecraft.bind(this)
  }

  selectSpacecraft(spacecraft) {
    this.setState({
      spacecraft: spacecraft!=="All" ? spacecraft : null
    })
  }

  render () {
    return (
      <div>
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
    )
  }
}

export default App
