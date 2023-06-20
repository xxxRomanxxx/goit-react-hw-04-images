import React from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root');
class Modal extends React.Component {

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = (evt) => {
    if (evt.code === "Escape") {
      this.props.onClose();
    }
  };

  onBackdropClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.onBackdropClick}>
        <div className={css.modal}>
					<button
            type="button"
            className={css.button}
            onClick={this.props.onClose}
          >Close
          </button>
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element,
}