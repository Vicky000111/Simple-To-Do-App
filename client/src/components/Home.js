import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post, put, remove } from "./services";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Home = () => {
  const navigate = useNavigate();
  const user_info = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user_info) {
      navigate("/");
    }else{
        getAllTasks();
    }
  }, []);

  const [tasks, setTasks] = useState([]);
  const getAllTasks = async () => {
    try {
      const response = await get(`task/user/${user_info?._id}`);
      setTasks(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [addTaskModal, setAddTaskModal] = useState(false);
  const [addTaskDetails, setAddTaskDetails] = useState({
    name: "",
    description: "",
    link: user_info?._id,
  });
  const submitAddTask = async () => {
    try {
      const response = await post("task/add", addTaskDetails);
      if (response) {
        setAddTaskModal(false);
        getAllTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const changeAddTask = (e) => {
    const { name, value } = e.target;
    setAddTaskDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const deleteTask = async (id) => {
    try {
      const response = await remove(`task/${id}`);
      if (response) {
        getAllTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [editModal, setEditModal] = useState(false)
  const [editModalDetails, setEditModalDetails] = useState(false)

  const editModalOpen = async (id) => {
    try {
      const response = await get(`task/${id}`);
      if (response) {
        setEditModalDetails(response)
        setEditModal(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeEditModalTasks = (e) => {
    const { name, value } = e.target;
    setEditModalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sumbitEditModal =  async () => {
    try {
      const response = await put(`task/${editModalDetails._id}`, editModalDetails);
      if (response) {
        setEditModal(false);
        getAllTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () =>{
    localStorage.removeItem('user')
    navigate("/")
  }

  return (
    <>
      <nav className="navbar bg-body-tertiary px-3">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Navbar</span>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <span style={{cursor:'pointer'}} onClick={()=>logout()} >Logout</span>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="container">
          <div className="login-text">
            <span>Add a Task</span>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setAddTaskModal(true)}
            >
              Add Task
            </button>
          </div>
        </div>
        {tasks && tasks.length === 0 && (
          <div className="container mt-5">
            <div className="col-md-12">No Tasks Found</div>
          </div>
        )}
        <div className="container mt-5">
          <div className="row">
            {tasks &&
              tasks.length > 0 &&
              tasks.map((item, index) => (
                <div className="col-md-4 my-2" key={index}>
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{item?.name}</h5>
                      <p class="card-text">{item?.description}</p>
                      <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => deleteTask(item?._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="primary"
                        className="ms-2"
                        onClick={() => editModalOpen(item?._id)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Modal show={addTaskModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder="name"
                name="name"
                value={addTaskDetails?.name}
                onChange={(e) => changeAddTask(e)}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputPassword4" className="form-label">
                description
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="description"
                name="description"
                value={addTaskDetails?.description}
                onChange={(e) => changeAddTask(e)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => submitAddTask()}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder="name"
                name="name"
                value={editModalDetails?.name}
                onChange={(e) => changeEditModalTasks(e)}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputPassword4" className="form-label">
                description
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="description"
                name="description"
                value={editModalDetails?.description}
                onChange={(e) => changeEditModalTasks(e)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => sumbitEditModal()}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
