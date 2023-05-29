import cards from "./cards.js"

import UTILS from "./classes/utils.js"
import SCREW from "./classes/screw.js"
import STROKE from "./classes/stroke.js"

let screw = new SCREW({value: 30, unit: UTILS.units.mm})
let stroke = new STROKE({value: 1, unit: UTILS.units.mm}, screw)

let SCREW_DIAMETER = 0
let CONVERSION_TYPE = ""
let STROKE_MM = 0
let STROKE_CM3 = 0


let card_validation_bts = document.getElementsByClassName("button")
let screw_diameter_input = document.getElementById("screw_diameter")

let radio_btn_conversion_type = document.getElementsByName("conversion_type")

let input_stroke_mm = document.getElementsByName("input_stroke_mm")[0]
let input_stroke_cm3 = document.getElementsByName("input_stroke_cm3")[0]

let result_output_stroke_cm3 = document.getElementsByName("result_stroke_cm3")[0]
let result_output_stroke_mm = document.getElementsByName("result_stroke_mm")[0]

let overview_result_output_elements = document.getElementsByClassName("overview-result")

function updateOverviewOutputElements(id, value) {
    for(let i = 0; i < overview_result_output_elements.length; i++) {
        if (id === "result_screw_diameter_mm") {
            if (overview_result_output_elements[i].id == id){
                overview_result_output_elements[i].innerHTML = Math.floor(Number(value))
            }
        }
        if (id === "result_stroke_mm") {
            if (overview_result_output_elements[i].id == id){
                overview_result_output_elements[i].innerHTML = Number(value).toFixed(1)
            }
        }
        if (id === "result_stroke_cm3") {
            if (overview_result_output_elements[i].id == id){
                overview_result_output_elements[i].innerHTML = Number(value).toFixed(3)
            }
        }
    }
}

function isCardValid(cardId) {
    if (cardId == "card-001") {
        if (screw_diameter_input.value < 10) return false
        if (screw_diameter_input.value == "") return false

        SCREW_DIAMETER = screw_diameter_input.value

        updateOverviewOutputElements("result_screw_diameter_mm", SCREW_DIAMETER)

        return true
    }
    if (cardId == "card-002") {

        for (let i = 0; i < radio_btn_conversion_type.length; i++){
            if (radio_btn_conversion_type[i].checked) {
                CONVERSION_TYPE = radio_btn_conversion_type[i].id
                inputStrokeFocusOutEventHandler({target: input_stroke_mm})
                inputStrokeFocusOutEventHandler({target: input_stroke_cm3})

                return true
            }
        }

        return false

    }
}

function clearInputOnFocusIn(e) {
    e.target.value = ""
}

function inputScrewDiameterFocusOutEventHandler(e) {
    let new_value = e.target.value

    if (new_value < 10) {
        e.target.style = "border-color: red;"
        e.target.value = e.target.getAttribute("value")
    }

    e.target.style = "border-color: #000;"

    SCREW_DIAMETER = e.target.value
    e.target.setAttribute("value", e.target.value)

    updateOverviewOutputElements("result_screw_diameter_mm", SCREW_DIAMETER)

}

function inputStrokeFocusOutEventHandler(e) {
    let new_value = e.target.value


    if (new_value <= 0) {
        e.target.style = "border-color: red;"
        e.target.value = e.target.getAttribute("value")
    }

    e.target.style = "border-color: #000;"


    if (e.target.name === "input_stroke_mm") {
        STROKE_MM = e.target.value
        e.target.setAttribute("value", e.target.value)

        updateOverviewOutputElements("result_stroke_mm", STROKE_MM)

        screw.update({value: SCREW_DIAMETER, unit: UTILS.units.mm})
        stroke.update({value: STROKE_MM, unit: UTILS.units.mm}, screw)

        result_output_stroke_cm3.value = UTILS.parse_unit_of_value(stroke.get_volume(), UTILS.units.cm3)
        input_stroke_cm3.value = UTILS.parse_unit_of_value(stroke.get_volume(), UTILS.units.cm3)

        updateOverviewOutputElements("result_stroke_cm3", UTILS.parse_unit_of_value(stroke.get_volume(), UTILS.units.cm3))
    }
    else if (e.target.name === "input_stroke_cm3") {
        STROKE_CM3 = e.target.value
        e.target.setAttribute("value", e.target.value)

        updateOverviewOutputElements("result_stroke_cm3", STROKE_CM3)

        screw.update({value: SCREW_DIAMETER, unit: UTILS.units.mm})
        stroke.update({value: STROKE_CM3, unit: UTILS.units.cm3}, screw)

        result_output_stroke_mm.value = stroke.get_stroke()
        input_stroke_mm.value = stroke.get_stroke()

        updateOverviewOutputElements("result_stroke_mm", stroke.get_stroke())
        
    }

}

function radioBtnChangeEventHandler(e) {
    card_validation_bts["002-validation"].setAttribute("nextPageId", e.target.getAttribute("toPage"))
    CONVERSION_TYPE = e.target.getAttribute("id")

    addEventListenersToCardValidationBtns()
}


function addEventListenersToRadioBtns() {
    for(let i = 0; i < radio_btn_conversion_type.length; i++) {
        radio_btn_conversion_type[i].addEventListener("change", radioBtnChangeEventHandler)
    }
}

function addEventListenersToCardValidationBtns() {
    for(let i = 0; i < card_validation_bts.length; i++) {
        card_validation_bts[i].addEventListener("click", function(e) {

            if (e.target.id == "001-validation") {
                if (!isCardValid("card-001")) {
                    screw_diameter_input.style = "background-color: #c32929;"
                    return
                }
            }

            if (e.target.id == "002-validation") {
                if (!isCardValid("card-002")) {
                    return
                }
            }


            cards.setCardVisibleById(e.target.getAttribute("nextPageId"))
        })
    }
}


screw_diameter_input.addEventListener("focusin", clearInputOnFocusIn)
input_stroke_mm.addEventListener("focusin", clearInputOnFocusIn)
input_stroke_cm3.addEventListener("focusin", clearInputOnFocusIn)


screw_diameter_input.addEventListener("focusout", inputScrewDiameterFocusOutEventHandler)

input_stroke_mm.addEventListener("focusout", inputStrokeFocusOutEventHandler)
input_stroke_cm3.addEventListener("focusout", inputStrokeFocusOutEventHandler)

addEventListenersToCardValidationBtns()
addEventListenersToRadioBtns()
