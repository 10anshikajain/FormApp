import * as type from "../types";

export function getForms(form){
    return {
        type: type.GET_FORM_REQUESTED,
        payload: form
    }
}

export function addForms(form){
    return {
        type: type.ADD_FORM,
        payload: form
    }
}