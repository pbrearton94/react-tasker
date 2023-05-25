import React, { useEffect, useState } from "react";
import testApp from "../../services/firebase.config";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import "./task.styles.scss";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const db = getFirestore();
  const collectionRef = collection(db, "tasks");

  useEffect(() => {
    const getTasks = async () => { 
      await getDocs(collectionRef).then((task) => {
        let tasksData = task.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setTasks(tasksData);
      });
    };

    getTasks();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row col-md-12">
          <div className="card card-black">
            <div className="card-body">
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
    </>
  );
};

export default Task;