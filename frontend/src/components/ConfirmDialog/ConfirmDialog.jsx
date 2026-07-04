import Modal from "../Modal/Modal";

function ConfirmDialog({
    isOpen,
    title = "Delete Confirmation",
    message,
    onConfirm,
    onClose
}) {

    return (

        <Modal
            isOpen={isOpen}
            title={title}
            onClose={onClose}
            onSubmit={onConfirm}
            submitText="Delete"
        >

            <p>{message}</p>

        </Modal>

    );

}

export default ConfirmDialog;