
let units = {
    mm  : "mm",
    cm  : "cm",
    mm2 : "mm2",
    cm2 : "cm2",
    mm3 : "mm3",
    cm3 : "cm3"
}

let unit_parse_correspondence = {
    mm  : "cm",
    cm  : "mm",
    mm2 : "cm2",
    cm2 : "mm2",
    mm3 : "cm3",
    cm3 : "mm3"

}

let mm_to_cm = (mm_value) => {
    // return value centimeters
    return mm_value / 10
}

let cm_to_mm = (cm_value) => {
    // return value millimeters
    return cm_value * 10
}

let mm2_to_cm2 = (mm2_value) => {
    // return value square centimeters
    return mm2_value / 100
}

let cm2_to_mm2 = (cm2_value) => {
    // return value square millimeters
    return cm2_value * 100
}

let mm3_to_cm3 = (mm3_value) => {
    // return value cubic centimeters
    return mm3_value / 1000
}

let cm3_to_mm3 = (cm3_value) => {
    // return value cubic millimeters
    return cm3_value * 1000
}

let old_unit_func_parse_correspondence = {
    mm : mm_to_cm,
    cm : cm_to_mm,
    mm2 : mm2_to_cm2,
    cm2 : cm2_to_mm2,
    mm3 : mm3_to_cm3,
    cm3 : cm3_to_mm3
}

let parse_unit_of_value = (value, new_unit) => {
    let new_u = units[new_unit]
    let old_u = unit_parse_correspondence[new_u]
    let corresponding_parse_func = old_unit_func_parse_correspondence[old_u]
    
    return corresponding_parse_func(value)
    
}

let get_circunference_area = (raduis) => {
    // retrun circunference area by radius
    return Math.PI * Math.pow(raduis, 2)
}

export default {
    units,
    parse_unit_of_value,
    mm_to_cm,
    cm_to_mm,
    get_circunference_area
}