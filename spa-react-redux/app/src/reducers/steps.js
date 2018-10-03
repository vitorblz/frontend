export function steps(state=[],action){
    if(action.type==='LIST'){
        return action.list;
    }

    if(action.type==='CREATE'){
        return action.list;
    }
    return state;
}