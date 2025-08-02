



const Modal = ({isOpen, onClose, children, title, firstName}) => {
    if(!isOpen) return null;

  return (
    <div className ='modal-backdrop' onClick={onClose}>
        <div className =  'modal-content' onClick={(e) => e.stopPropagation()}>
        <button  className='close-button' onClick= {onClose} >x</button>
        <div className='modal-title'>{title}</div>
        <div className='modal-body'>{children}</div>
        {firstName}
      
        </div>
    </div>
  );
};


export default Modal;