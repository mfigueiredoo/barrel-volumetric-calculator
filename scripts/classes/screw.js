import UTILS from "./utils.js"

class SCREW {
    constructor(diameter_obj){

        this.unit = diameter_obj.unit

        if(this.unit === UTILS.units.mm) this.diameter = diameter_obj.value
        else {this.diameter = UTILS.parse_unit_of_value(diameter_obj.value, UTILS.units.mm)}

        this.raduis = this.diameter/2
        this.perimeter = Math.PI * this.diameter
        this.area = UTILS.get_circunference_area(this.raduis)

        this.get_diameter = () => {
            return this.diameter
        }

        this.get_raduis = () => {
            return this.diameter/2
        }

        this.get_perimeter = () => {
            return Math.PI * this.diameter
        }

        this.get_area = () => {
            return UTILS.get_circunference_area(this.raduis)
        }

        this.update = (diameter_obj) => {
            this.unit = diameter_obj.unit

            if(this.unit === UTILS.units.mm) this.diameter = diameter_obj.value
            else {this.diameter = UTILS.parse_unit_of_value(diameter_obj.value, UTILS.units.mm)}

            this.raduis = this.diameter/2
            this.perimeter = Math.PI * this.diameter
            this.area = UTILS.get_circunference_area(this.raduis)
        }
    }
}

export default SCREW