const getName = (spacecraft) => {
  switch(spacecraft) {
    case ("galactica"):
      return "Galactica"
    case ("colonialOne"):
      return "Colonial One"
    case ("zephir"):
      return "Zephir"
    default:
      return "A spacecraft from BSG"
  }
}
export default getName
