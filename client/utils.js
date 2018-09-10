export function log(t) {    
    console.log(t)
}

export function trace() {
    log(arguments)
}

export function elementSize(e) {    
    return {
        width: parseInt(e.style.width, 10),
        height: parseInt(e.style.height, 10)
    }
}

export function copy(v) {
    return Object.assign({}, v);
}

export function copyList(ar)  {
  return ar.map(d => Object.assign({}, d));
}

export function delay(ms, value) {
    var promise = new Promise(function(accept, reject) {
        setTimeout(accept(value), ms);    
    })
    return promise;
    
}
