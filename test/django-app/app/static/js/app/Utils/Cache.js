export function addTempVar(var_name, initial) {
    window[var_name] = initial
}


export function getTempVar(var_name) {
    return window[var_name]
}