import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import "./task.styles.scss";
import EditTask from "../edit-task/edit-task.component";
import AddTask from "../add-task/add-task.component";
import DeleteTask from "../delete-task/delete-task.component";

/**
 * 
 * Thetask component, responsible for representing the list of todo item elements
 *
 * @returns the edited todo list item
 */
const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [checked, setChecked] = useState([]);
  const db = getFirestore();
  const collectionRef = collection(db, "tasks");

  useEffect(() => {
    const getTasks = async () => {
      const q = query(collectionRef, orderBy("timestamp"));

      await getDocs(q)
        .then((task) => {
          let tasksData = task.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setTasks(tasksData);
          setChecked(tasksData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTasks();
  }, []);

  //Checkbox Handler
  const checkboxHandler = async (event) => {
    console.log(event.target.name);
    setChecked((state) => {
      const index = state.findIndex(
        (checkbox) => checkbox.id.toString() === event.target.name
      );
      let newState = state.slice();

      newState.splice(index, 1, {
        ...state[index],
        isChecked: !state[index].isChecked,
      });
      setTasks(newState);
      return newState;
    });

    //Persist checkbox state
    try {
      const docRef = doc(db, "tasks", event.target.name);
      await runTransaction(db, async (transaction) => {
        const taskDoc = await transaction.get(docRef);
        if (!taskDoc.exists()) {
          throw new Error("Document does not exist");
        }
        const newValue = !taskDoc.data().isChecked;
        transaction.update(docRef, { isChecked: newValue });
      });
    } catch (err) {
      console.log("Failed to check task", err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row col-md-12">
          <div className="card">
            <h2 className="card-title text-center">Todo List</h2>
            <div className="card-body">
              {tasks.map(({ task, id, isChecked, timestamp }) => (
                <ul className="list-group list-group-flush" key={id}>
                  <li className="list-group-item" key={id}>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isChecked}
                        onChange={(event) => checkboxHandler(event)}
                        name={id}
                        id={`flexSwitchCheckDefault${id}`}
                      ></input>
                      <label
                        className={`${isChecked === true ? "done" : ""}`}
                        htmlFor={`flexSwitchCheckDefault${id}`}
                        name={id}
                      >
                        {task}
                      </label>
                      <span className="float-end mx-3">
                        <EditTask task={task} id={id} /><br></br><br></br>
                        <DeleteTask task={task} id={id} />
                      </span>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
            <div className="card-footer">
              <AddTask />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
