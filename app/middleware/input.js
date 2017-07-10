const actionTypes = require('../actions/actionTypes');
const actions = require('../actions');
const { text } = require('../ui/input');
const { keys } = require('lodash/fp');


module.exports = store => next => action => {
    const handleInputAction = (options, action) => {
        text(options, input => store.dispatch(action(input)));
    };
    switch (action.type) {
        case actionTypes.INPUT_PATH:
            return handleInputAction({
                msg: 'path: ',
                default: store.getState().path || ''
            }, actions.setPath);
        case actionTypes.INPUT_RELATIVE_PATH:
            return handleInputAction({
                msg: 'rel path: '
            }, actions.setRelativePath);
        case actionTypes.INPUT_MAP:
            return handleInputAction({ 
                msg: 'map: ',
                default: store.getState().map || ''
            }, actions.setMap);
        case actionTypes.INPUT_PICK:
            return handleInputAction({
                msg: 'pick: ',
                default: store.getState().pick || ''
            }, actions.setPick);
        case actionTypes.INPUT_OMIT:
            return handleInputAction({
                msg: 'omit: ',
                default: store.getState().omit || ''
            }, actions.setOmit);
        case actionTypes.INPUT_SAVE:
            return handleInputAction({
                msg: 'save file: ',
                default: store.getState().filename || ''
            }, actions.save);
        case actionTypes.INPUT_PATH_VALUE:
            const { path } = store.getState();
            return handleInputAction({
                msg: `path ('${path}') value: `
            }, actions.setPathValue);
        case actionTypes.INPUT_ADD_CACHE:
            return handleInputAction({
                msg: 'add to cache: '
            }, actions.addCache);
        case actionTypes.INPUT_LOAD_CACHE:
            return handleInputAction({
                msg: 'load from cache: ',
                autoComplete: keys(store.getState().cache),
                autoCompleteMenu: true
            }, actions.loadCache);
        case actionTypes.INPUT_DELETE_CACHE:
            return handleInputAction({
                msg: 'delete from cache: '
            }, actions.deleteCache);
        default:
            return next(action);
    }
};

