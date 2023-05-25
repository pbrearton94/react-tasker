import React, { useState } from "react";
import testApp from "../../services/firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import "./edit-task.styles.scss";

const EditTask = ({ task, id }) => {
  const [updatedTask, setUpdatedTask] = useState([task]);
  const db = getFirestore();

  const updateTask = async (event) => {
    event.preventDefault();

    try {
      const taskDocument = doc(db, "tasks", id);

      await updateDoc(taskDocument, {
        task: updatedTask,
        isChecked: false,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#id${id}`}
      >
        Update Task
      </button>
      <div
        className="modal fade"
        id={`id${id}`}
        tabIndex="-1"
        aria-labelledby="updateTaskLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="d-flex">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="updateTaskLabel">
                  Update Task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Update a task"
                  defaultValue={updatedTask}
                  onChange={(event) => setUpdatedTask(event.target.value)}
                />
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
                  onClick={(event) => updateTask(event)}
                  type="submit"
                  className="btn btn-primary"
                >
                  Update Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTask;
