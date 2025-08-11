



const Modal = ({isOpen, onClose, children, title}) => {
    if(!isOpen) return null;

  return (
    <div className ='modal-overlay' onClick={onClose}>
        <div className =  'modal-container' onClick={(e) => e.stopPropagation()}>
        {/* <button  className='close-button' onClick= {onClose} >x</button> */}
        <div className='modal-title'>{title}</div>
        <div className='modal-body'>{children}</div>
      
      
        </div>
    </div>
  );
};


export default Modal;