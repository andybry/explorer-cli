const actionTypes = require('../actions/actionTypes');
const actions = require('../actions');
const { text } = require('../ui/input');


module.exports = proc => store => next => action => {
    const handleInputAction = (msg, action, store) => {
        text(proc, msg, input => store.dispatch(action(input)));
    };
    switch (action.type) {
        case actionTypes.INPUT_PATH:
            return handleInputAction('path: ', actions.setPath, store);
        case actionTypes.INPUT_RELATIVE_PATH:
            return handleInputAction('rel path: ', actions.setRelativePath, store);
        case actionTypes.INPUT_MAP:
            return handleInputAction('map: ', actions.setMap, store);
        case actionTypes.INPUT_PICK:
            return handleInputAction('pick: ', actions.setPick, store);
        case actionTypes.INPUT_OMIT:
            return handleInputAction('omit: ', actions.setOmit, store);
        case actionTypes.INPUT_SAVE:
            return handleInputAction('save file: ', actions.save, store);
        case actionTypes.INPUT_PATH_VALUE:
            const { path } = store.getState();
            return handleInputAction(`path ('${path}') value: `, actions.setPathValue, store);
        case actionTypes.INPUT_ADD_CACHE:
            return handleInputAction('add to cache: ', actions.addCache, store);
        case actionTypes.INPUT_LOAD_CACHE:
            return handleInputAction('load from cache: ', actions.loadCache, store);
        case actionTypes.INPUT_DELETE_CACHE:
            return handleInputAction('delete from cache: ', actions.deleteCache, store);
        default:
            return next(action);
    }
};

