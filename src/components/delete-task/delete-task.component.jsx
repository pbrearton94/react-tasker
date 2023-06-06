import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore";
import React from "react";

/**
 * 
 * The delete task component, responsible for providing a modal to remove the selected todo list item
 *
 * @param {task} task the task to be deleted from the todo list
 * @param {id} id the id associated with the task to be deleted
 */
const DeleteTask = ({ task, id }) => {
  const db = getFirestore();

  //Delete Task Handler
  const deleteTask = async (event) => {
    event.preventDefault();

    try {
      const documentRef = doc(db, "tasks", id);
      await deleteDoc(documentRef);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target={`#delete-id${id}`}
        id="delete-button"
      >
        Delete Task
      </button>
      <div
        className="modal fade"
        id={`delete-id${id}`}
        tabIndex="-1"
        aria-labelledby="deleteTaskLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="d-flex">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteTaskLabel">
                  Delete Task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Are you sure that you want to delete {task}?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={(event) => deleteTask(event)}
                  type="submit"
                  className="btn btn-danger"
                >
                  Delete Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteTask;
