const { flow, get, map, pick, omit, keys, split } = require('lodash/fp');

module.exports = state => flow(
    x => state.path ? get(state.path, x) || {} : x,
    x => state.map ? map(state.map, x) || {} : x,
    x => state.pick ? pick(state.pick.split(','), x) : x,
    x => state.omit ? omit(state.omit.split(','), x) : x,
    x => state.keys ? keys(x) : x,
    x => state.state ? omit(['data', 'helpText', 'cache'], state) : x,
    x => state.help ? state.helpText : x,
    x => state.showCache ? keys(state.cache) : x,
    x => JSON.stringify(x, null, 2),
    split('\n')
)(state.data);