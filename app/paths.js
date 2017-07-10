const { keys, isString, flatMap, map, concat } = require('lodash/fp');

const paths = obj => {
    const ks = keys(obj);
    if (keys.length === 0 || isString(obj)) return [];
    return concat(ks, flatMap(k => map(x => `${k}.${x}` , paths(obj[k])), ks));
}

module.exports = paths;