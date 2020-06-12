import React from 'react';

function ConfirmDeleteModal({movie, onClickDelete}) {
  return (
    <div className='modal fade' id='confirm-delete-modal' tabIndex='-1' role='dialog'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title'>Do you want to delete this movie ?</h4>
            <button type='button' className='close' data-dismiss='modal'>
              <span>&times;</span>
            </button>
          </div>
          <div className='modal-body text-center'>
            <h3 className='mt-2'>{movie?.title}</h3>
            <h5 className='mb-2'>{movie?.category}</h5>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-dismiss='modal'>
              Cancel
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={onClickDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ConfirmDeleteModal.defaultProps = {
  movie: {},
  onClickDelete: () => {}
};

export default ConfirmDeleteModal;
