import React, { useEffect, useState } from "react";
import testApp from "../../services/firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import "./task.styles.scss";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [createTask, setCreateTask] = useState([]);
  const db = getFirestore();
  const collectionRef = collection(db, "tasks");

  useEffect(() => {
    const getTasks = async () => {
      await getDocs(collectionRef)
        .then((task) => {
          let tasksData = task.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setTasks(tasksData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTasks();
  }, []);

  //Add Task Handler
  const submitTask = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collectionRef, {
        task: createTask,
        isChecked: false,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  //Delete Task Handler
  const deleteTask = async (id) => {
    try {
      window.confirm("Are you sure you want to delete this task?");
      const documentRef = doc(db, "tasks", id);
      await deleteDoc(documentRef);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row col-md-12">
          <div className="card card-black">
            <div className="card-body">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addTask"
              >
                Add Task
              </button>
              {tasks.map(({ task, id }) => (
                <div className="todo-list" key={id}>
                  <div className="todo-item">
                    <hr />
                    <span>
                      <div className="checker">
                        <span>
                          <input type="checkbox" />
                        </span>
                      </div>
                      {task}
                    </span>
                    <span className="float-end mx-3">
                      <button
                        type="button"
                        className="btn btn-primary float-end mx-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(id)}
                        type="button"
                        className="btn btn-danger float-end mx-3"
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
                  Modal title
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

export default Task;