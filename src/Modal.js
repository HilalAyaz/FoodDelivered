import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  maxHeight: '90%', 
  width: '90%',
  backgroundColor: 'rgb(34, 34, 34)',
  overflowY: 'auto', 
  padding: '20px',
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000
}

const CLOSE_BUTTON_STYLES = {
  position: 'absolute',
  top: '10px', 
  right: '10px', 
  backgroundColor: 'rgba(224, 36, 58)',
  border: 'none',
  borderRadius: '10px',
  color: 'white',
  fontSize: '20px',
  cursor: 'pointer'
}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button style={CLOSE_BUTTON_STYLES} onClick={onClose}>Close</button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}
