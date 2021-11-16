import { SAVE_SETTINGS } from "./action-types";

const initialState = {
    stats: null
}

export default function (state = initialState, action){
    switch (action.type) {
        case SAVE_SETTINGS:
            
            break;
    
        default:
            break;
    }
    return state;
}