import "./Modal.css";

function Modal({
    isOpen,
    title,
    children,
    onClose,
    onSubmit,
    submitText = "Save"
}) {

    if (!isOpen) {
        return null;
    }

    return (

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="modal-header">

                    <h2>{title}</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="modal-body">

                    {children}

                </div>

                <div className="modal-footer">

                    <button
                        className="secondary-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="primary-btn"
                        onClick={onSubmit}
                    >
                        {submitText}
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Modal;