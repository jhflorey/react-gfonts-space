import React from 'react';
import PropTypes from 'prop-types';
import './TextBoxContainer.scss';
import TextBox from './../TextBox';

const TextBoxContainer = (props) => {
    return (
        <div className="TextBoxContainer">
            {props.textBoxes.map((item, index) => {
                return (
                    <div key={`index-${index}`}>
                        <TextBox {...item}
                            dataItem={index}
                            length={props.textBoxes.length} />
                    </div>
                )
            })}
        </div>
    );
}

TextBoxContainer.propTypes = {
    textBoxes: PropTypes.array
};

export default TextBoxContainer;
