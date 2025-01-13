function Popup({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return <div className="Popup-overlay">
      <div className="Popup-content">
      <button className="modal-close" onClick={onClose}>
            &times; 
          </button>
          {children}
      </div>
    </div>;
  }
  
  export default Popup;