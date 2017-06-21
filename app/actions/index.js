const actionTypes = require('./actionTypes');

module.exports = {
    quit: () => ({
        type: actionTypes.QUIT
    }),
    clear: () => ({
        type: actionTypes.CLEAR
    }),
    scrollUp: () => ({
        type: actionTypes.SCROLL_UP,
    }),
    scrollDown: () => ({
        type: actionTypes.SCROLL_DOWN,
    }),
    scrollHalfScreenUp: () => ({
        type: actionTypes.SCROLL_HALF_SCREEN_UP,
    }),
    scrollHalfScreenDown: () => ({
        type: actionTypes.SCROLL_HALF_SCREEN_DOWN,
    }),
    resize: ({ rows, columns }) => ({
        type: actionTypes.RESIZE,
        rows,
        columns
    }),
    toggleKeys: () => ({
        type: actionTypes.TOGGLE_KEYS
    }),
    toggleHelp: () => ({
        type: actionTypes.TOGGLE_HELP
    }),
    toggleState: () => ({
        type: actionTypes.TOGGLE_STATE
    }),
    inputPath: () => ({
        type: actionTypes.INPUT_PATH
    }),
    setPath: path => ({
        type: actionTypes.SET_PATH,
        path
    }),
    inputMap: () => ({
        type: actionTypes.INPUT_MAP
    }),
    setMap: map => ({
        type: actionTypes.SET_MAP,
        map
    }),
    inputRelativePath: () => ({
        type: actionTypes.INPUT_RELATIVE_PATH
    }),
    setRelativePath: path => ({
        type: actionTypes.SET_RELATIVE_PATH,
        path
    }),
    inputOmit: () => ({
        type: actionTypes.INPUT_OMIT
    }),
    setOmit: omit => ({
        type: actionTypes.SET_OMIT,
        omit
    }),
    inputPick: () => ({
        type: actionTypes.INPUT_PICK
    }),
    setPick: pick => ({
        type: actionTypes.SET_PICK,
        pick
    }),
    inputSave: () => ({
        type: actionTypes.INPUT_SAVE
    }),
    save: file => ({
        type: actionTypes.SAVE,
        file
    }),
    inputPathValue: () => ({
        type: actionTypes.INPUT_PATH_VALUE
    }),
    setPathValue: val => ({
        type: actionTypes.SET_PATH_VALUE,
        val
    }),
    deletePath: () => ({
        type: actionTypes.DELETE_PATH
    }),
    inputAddCache: () => ({
        type: actionTypes.INPUT_ADD_CACHE
    }),
    addCache: key => ({
        type: actionTypes.ADD_CACHE,
        key
    }),
    inputLoadCache: () => ({
        type: actionTypes.INPUT_LOAD_CACHE
    }),
    loadCache: key => ({
        type: actionTypes.LOAD_CACHE,
        key
    }),
    inputDeleteCache: () => ({
        type: actionTypes.INPUT_DELETE_CACHE
    }),
    deleteCache: key => ({
        type: actionTypes.DELETE_CACHE,
        key
    }),
    toggleCacheList: () => ({
        type: actionTypes.TOGGLE_CACHE_LIST,
    }),
};