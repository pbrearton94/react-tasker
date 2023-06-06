import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import React, { useState } from "react";

/**
 * 
 * The add task component, responsible for providing a modal to add a new item to the todo list
 *
 */
const AddTask = () => {
  const [createTask, setCreateTask] = useState([]);

  const db = getFirestore();
  const collectionRef = collection(db, "tasks");

  //Add Task Handler
  const submitTask = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collectionRef, {
        task: createTask,
        isChecked: false,
        timestamp: serverTimestamp(),
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
        data-bs-target="#addTask"
      >
        Add Task
      </button>
      <div
        className="modal fade"
        id="addTask"
        tabIndex="-1"
        aria-labelledby="addTaskLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form onSubmit={submitTask} className="d-flex">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addTaskLabel">
                  Add Task
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
                  onChange={(event) => setCreateTask(event.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Add a task"
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
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
