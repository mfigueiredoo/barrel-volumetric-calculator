import UTILS from "./classes/utils.js"
import SCREW from "./classes/screw.js"
import STROKE from "./classes/stroke.js"

let screw = new SCREW({value: 40, unit: UTILS.units.mm})
let stroke = new STROKE({value: 60, unit: UTILS.units.mm}, screw)

console.log(UTILS.parse_unit_of_value(stroke.get_volume(), UTILS.units.cm3))