import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _map from 'lodash/map';
import 'react-select/dist/react-select.css'

import GFontsAction from './../../Containers/Actions';

import WebFont from 'webfontloader';
import ColorPicker from './../ColorPicker'
import './FontOptionContainer.scss'

export class FontOptionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bgColor: this.props.bgColor,
            isFontVariantDisabled: true,
        }
        this.handleClickOnCategory = this.handleClickOnCategory.bind(this);
        this.handleChangeFontFamily = this.handleChangeFontFamily.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleChangeBgColor = this.handleChangeBgColor.bind(this);
        this.handleChangeFontSize = this.handleChangeFontSize.bind(this);
        this.handleChangeLineHeight = this.handleChangeLineHeight.bind(this);
        this.handleChangeFontVariant = this.handleChangeFontVariant.bind(this);
    }

    handleClickOnCategory(event) {
        this.setState({isFontVariantDisabled : true})
        let categoryName = event.target.dataset.category;
        this.props.categoryChange(this.props.fonts, categoryName, this.props.userSelectedTextBox)
    }

    handleChangeFontFamily(selectedFontFamily) {
        let activeTextBox = this.props.textBoxOption[this.props.userSelectedTextBox];
        this.setState({isFontVariantDisabled : false})
        this.props.changeFontFamily(selectedFontFamily, this.props.userSelectedTextBox, activeTextBox.availableFontFamilies)
        setTimeout(() => {
            let fontToBeLoader = `${selectedFontFamily.value}:${_map(this.props.textBoxOption[this.props.userSelectedTextBox].availableFontVariants, "label").toString()}`
            selectedFontFamily && WebFont.load({
                google: {
                    families: [fontToBeLoader]
                }
            });
        }, 0);
    }

    handleChangeColor(color) {
        this.props.changeTextColor(color, this.props.userSelectedTextBox)
    }

    handleChangeBgColor(color) {
        this.props.changeBgColor(color)
    }

    handleChangeFontSize(event) {
        this.props.changeFontSize(event.target.value, this.props.userSelectedTextBox)
    }

    handleChangeLineHeight(event) {
        this.props.changeLineHeight(event.target.value, this.props.userSelectedTextBox)
    }

    handleChangeFontVariant(selectedFontVariant) {
        this.props.changeFontVariant(selectedFontVariant, this.props.userSelectedTextBox)
    }


    render() {
        let activeTextBox =  this.props.textBoxOption[this.props.userSelectedTextBox];
        return (
            <section className="FontOptionContainer">
                <section className="FontOptionContainer__Item">
                    <h4 className="FontOptionContainer__Title">Classification</h4>
                    <ul>
                        {this.props.availableCategories.map((category, index) =>
                            <li key={`${category.name}-${index}`}
                                data-category={category.name}
                                className={`${category.name === activeTextBox.category ? "active" : "inactive"}`}
                                onClick={this.handleClickOnCategory}>
                                {category.name}
                            </li>)
                        }
                    </ul>
                </section>
                <section className="FontOptionContainer__Item">
                    <h4 className="FontOptionContainer__Title">Propeties</h4>
                    <div className="FontOptionContainer__Properties">
                        <Select
                            name="FontFamilySelectBox"
                            value={activeTextBox.fontFamily}
                            onChange={this.handleChangeFontFamily}
                            options={activeTextBox.availableFontFamilies}
                            clearable={true}
                            placeholder="Select Font Family"
                        />

                        <Select
                            name="FontVariantSelectBox"
                            value={activeTextBox.fontVariant}
                            onChange={this.handleChangeFontVariant}
                            options={activeTextBox.availableFontVariants}
                            clearable={false}
                            disabled={this.state.isFontVariantDisabled}
                            backspaceRemoves={false}
                            placeholder="Select Font Variants"
                        />

                        <div className="OtherProperties">
                            <div className="FontSize__Option OtherProperties__Option">
                                <label>Font size</label>
                                <input type="number"
                                    name="quantity"
                                    min="9"
                                    max="248"
                                    onChange={this.handleChangeFontSize}
                                    value={activeTextBox.fontSize}
                                />
                            </div>
                            <div className="LineHeight__Option OtherProperties__Option">
                                <label>Line height</label>
                                <input type="number"
                                    name="lineHeight"
                                    min="0"
                                    onChange={this.handleChangeLineHeight}
                                    value={activeTextBox.lineHeight}
                                />
                            </div>
                            <div className="ColorOption__ForeGround OtherProperties__Option">
                                <label>Text Color</label>
                                <ColorPicker
                                    color={activeTextBox.color}
                                    handleChangeColor={this.handleChangeColor}
                                />
                            </div>
                            <div className="ColorOption__BackGround OtherProperties__Option">
                                <label>Background Color</label>
                                <ColorPicker color={this.props.bgColor}
                                    handleChangeBgColor={this.handleChangeBgColor}
                                    isBackgroundColorPicker
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </section >
        );
    }
}
FontOptionContainer.propTypes = {
    availableCategories: PropTypes.array,
    categoryChange: PropTypes.func,
    changeFontFamily: PropTypes.func,
    changeFontSize: PropTypes.func,
    changeLineHeight: PropTypes.func,
    changeFontVariant: PropTypes.func,
    changeTextColor: PropTypes.func,
    changeBgColor: PropTypes.func,
    fonts: PropTypes.object,
    textBoxOption: PropTypes.array,
    userSelectedTextBox: PropTypes.number
};


function mapStateToProps(state) {
    return {
        userSelectedTextBox: state.GFontsReducer.userSelectedTextBox,
        textBoxOption: state.GFontsReducer.textBoxOption,
        fonts: state.GFontsReducer.fonts,
        availableCategories: state.GFontsReducer.availableCategories,
        bgColor: state.GFontsReducer.bgColor,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        categoryChange: (fonts, selectedCategory, userSelectedTextBox) => {
            dispatch(GFontsAction.categoryChange(dispatch, fonts, selectedCategory, userSelectedTextBox))
        },
        changeFontFamily: (fontFamily, userSelectedTextBox, availableFontFamilies) => {
            dispatch(GFontsAction.changeFontFamily(dispatch, fontFamily, userSelectedTextBox, availableFontFamilies))
        },
        changeFontVariant: (fontVariant, userSelectedTextBox) => {
            dispatch(GFontsAction.changeFontVariant(dispatch, fontVariant, userSelectedTextBox))
        },
        changeTextColor: (color, userSelectedTextBox) => {
            dispatch(GFontsAction.changeTextColor(dispatch, color, userSelectedTextBox))
        },
        changeBgColor: (color, userSelectedTextBox) => {
            dispatch(GFontsAction.changeBgColor(dispatch, color))
        },
        changeFontSize: (fontSize, userSelectedTextBox) => {
            dispatch(GFontsAction.changeFontSize(dispatch, fontSize, userSelectedTextBox))
        },
        changeLineHeight: (lineHeight, userSelectedTextBox) => {
            dispatch(GFontsAction.changeLineHeight(dispatch, lineHeight, userSelectedTextBox))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FontOptionContainer)
