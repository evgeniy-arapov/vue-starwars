import ResourceModel from "@/store/models/resource"
class StarshipModel extends ResourceModel{
  constructor (props) {
    super(props)
  }
}
StarshipModel.prototype.aliases = {
  pilots: "people",
  ...StarshipModel.prototype.aliases
}

export default StarshipModel
