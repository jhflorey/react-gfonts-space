
import { fetchGoolgeFonts, mappedCategoryArray } from './../../Mapper';
// import _cloneDeep from 'lodash/cloneDeep';

export default {
    fetchData: (dispatch) => {
        return dispatch => {
            return fetchGoolgeFonts().then((res) => {
                dispatch({
                    type: "FETCHED_FONTS",
                    payload: {
                        fonts: res.fonts,
                        availableCategories: mappedCategoryArray(res.categories),
                        availableFontFamilies: res.fonts["All"]
                    }
                });
            });
        }
    },

    categoryChange: (dispatch, fonts, selectedCategory, userSelectedTextBox) => {
        return dispatch => {
            dispatch({
                type: "CATEGORY_CHANGED",
                payload: {
                    userSelectedTextBox: userSelectedTextBox,
                    selectedCategory: selectedCategory,
                    availableFontFamilies: fonts[selectedCategory],
                }
            });
        }
    },

    changeFontFamily: (dispatch, fontFamily, userSelectedTextBox, availableFontFamilies) =>{
        return dispatch => {
            dispatch({
                type: "FONTFAMLIY_CHANGED",
                payload: {
                    fontFamily: fontFamily.value,
                    userSelectedTextBox: userSelectedTextBox,
                    availableFontVariants: availableFontFamilies.filter(x => x.value === fontFamily.value)[0].variants
                }
            });
        }
    },

    changeFontVariant: (dispatch, fontVariant, userSelectedTextBox) => {
        return dispatch => {
            dispatch({
                type: "FONTVARIANT_CHANGED",
                payload: {
                    fontVariant: fontVariant.value,
                    userSelectedTextBox: userSelectedTextBox
                }
            });
        }
    },

    changeTextBox: (dispatch, activeTextBox) => {
        return dispatch => {
            dispatch({
                type: "TEXTBOX_CHANGED",
                payload: {
                    userSelectedTextBox: activeTextBox,
                }
            });
        }
    },

    changeTextColor: (dispatch, color, userSelectedTextBox) => {
        return dispatch => {
            dispatch({
                type: "TEXTCOLOR_CHANGED",
                payload: {
                    color: color.rgb,
                    userSelectedTextBox: userSelectedTextBox,
                }
            });
        }
    },

    changeBgColor: (dispatch, color) => {
        return dispatch => {
            dispatch({
                type: "BGCOLOR_CHANGED",
                payload: {
                    color: color.rgb,
                }
            });
        }
    },

    changeFontSize: (dispatch, fontSize, userSelectedTextBox) => {
        return dispatch => {
            dispatch({
                type: "FONTSIZE_CHANGED",
                payload: {
                    fontSize: fontSize,
                    userSelectedTextBox: userSelectedTextBox,
                }
            });
        }
    },
    
    changeLineHeight: (dispatch, lineHeight, userSelectedTextBox) => {
        return dispatch => {
            dispatch({
                type: "LINEHEIGHT_CHANGED",
                payload: {
                    lineHeight: lineHeight,
                    userSelectedTextBox: userSelectedTextBox,
                }
            });
        }
    },

    addTextBox: (dispatch, userSelectedTextBox) =>{
        return dispatch => {
            dispatch({
                type: "NEWTEXTBOX_ADDED",
                payload: {
                    userSelectedTextBox: userSelectedTextBox,
                }
            });
        }
    },

    removeTextBox: (dispatch, userSelectedTextBox) =>{
        return dispatch => {
            dispatch({
                type: "TEXTBOX_REMOVED",
                payload: {
                    userSelectedTextBox: userSelectedTextBox,
                }
            });
        }
    }
}
