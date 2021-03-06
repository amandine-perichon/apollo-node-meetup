import fs from 'fs'
import path from 'path'

const readFleet = () => JSON.parse(fs.readFileSync(path.join(__dirname, 'fleet.js')).toString())

const getFleet = spacecraft => {
  const fleet = readFleet()
  return spacecraft ?
  fleet.filter((crew, i, fleet) => crew.spacecraft === spacecraft) : fleet
}

const addCrew = data => {
  const fleet = readFleet()
  const newCrew = Object.assign({id: fleet.length+1}, data)
  fs.writeFileSync(path.join(__dirname, 'fleet.js'), JSON.stringify([...fleet, newCrew], null, 4))
  return newCrew
}


export default {
  getFleet,
  addCrew
}
