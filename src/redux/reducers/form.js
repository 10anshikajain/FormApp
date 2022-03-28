import * as type from "../types";
 
const initialState = {
    form: [{question: "", answer: ""}],
    
    loading: false,
    error: null
}

export default function form(state = initialState, action){
    switch(action.type){
        case type.ADD_FORM:
            return {
                ...state,
                loading: true
            }
                case type.GET_FORM_REQUESTED:
                    return {
                        ...state,
                        loading: true
                    }
                case type.GET_FORM_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        form: action.form
                    }
                case type.GET_FORM_FAILED:
                    return {
                            ...state,
                            loading: false,
                            error: action.message,
                    }
        default:
            return state;
    }
}