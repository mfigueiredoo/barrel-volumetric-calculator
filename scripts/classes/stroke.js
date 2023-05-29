import SCREW from "./screw.js"
import UTILS from "./utils.js"

class STROKE {
    constructor(stroke_obj, screw) {

        this.unit = stroke_obj.unit
        this.value = stroke_obj.value

        this.screw = screw || new SCREW()

        this.get_volume = () => {

            if (this.unit === UTILS.units.mm3) return this.value
            if (this.unit === UTILS.units.cm3) return UTILS.parse_unit_of_value(this.value, UTILS.units.mm3)

            this.volume_mm3 = this.screw.get_area() * this.value
            return this.volume_mm3
        }

        this.get_stroke = () => {

            if (this.unit === UTILS.units.mm) return this.value
            if (this.unit === UTILS.units.cm) return UTILS.parse_unit_of_value(this.value, UTILS.units.mm)

            let stroke_mm = this.get_volume() / this.screw.get_area()
            return stroke_mm
        }

        this.update = (stroke_obj, screw) => {
            this.unit = stroke_obj.unit
            this.value = stroke_obj.value

            this.screw = screw || new SCREW()
        }

    }
}

export default STROKE