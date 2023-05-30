import SCREW from "./screw.js"
import UTILS from "./utils.js"

class ROTATION {
    constructor(rotation_obj, screw) {

        this.unit = rotation_obj.unit
        this.value = rotation_obj.value

        this.screw = screw || new SCREW()

        this.get_rotation = (requested_unit) => {

            if (requested_unit == this.unit) return this.value

            if (requested_unit === UTILS.units.rpm) {
                this.rotation_mms = (this.value / this.screw.get_perimeter()) * 60
                return this.rotation_mms
            }

            if (requested_unit === UTILS.units.mms) {
                this.rotation_rpm = this.screw.get_perimeter() * (this.value / 60)
                return this.rotation_rpm
            }

        }

        this.update = (rotation_obj, screw) => {
            this.unit = rotation_obj.unit
            this.value = rotation_obj.value

            this.screw = screw || new SCREW()
        }

    }
}

export default ROTATION