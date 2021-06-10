export function language(state,action){
    switch(action.type){
        case "tr":
            return{...state,language:action.payload}
        case "en":
            return {...state,language:action.payload}
        default:
            return state;
    }
}