export function saveStep(list){
    return {type:'CREATE',list};
}

export function listStep(list){
    return {type:'LIST',list};
}

export function message(msg){
    return {type:'ALERT',msg};
}