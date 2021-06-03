export function language(state,action){
    switch(action.type){
        case "TR":
            return{...state,language:action.payload}
        case "EN":
            return {...state,language:action.payload}
        default:
            return state;
    }
}