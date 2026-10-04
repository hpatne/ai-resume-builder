/*
 * ConfirmDialog.jsx
 * "Are you sure?" dialog shown before destructive actions such as deleting a
 * resume, company, role or template.
 */
import Modal from './Modal'
import Button from './Button'

function ConfirmDialog({ title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
  return (
    <Modal
      title={title}
      onClose={onCancel}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-[15px] leading-relaxed text-ink-soft">{message}</p>
    </Modal>
  )
}

export default ConfirmDialog
