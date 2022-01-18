import { Container, Stack, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidV4 } from 'uuid'
function App() {
  //    for saving tasks
  const [Tasks, setTasks] = useState([])
  //    for tracking and saving input value
  const [title, setTitle] = useState('')
  //    for tracking selected category
  const [currentCategory, setCurrentCategory] = useState('All')

  //    create a task
  function createTask() {
    title !== "" && setTasks(prevTasks => {
      return [...prevTasks, { id: uuidV4(), title, status: false }]
    })
    setTitle('');
  }
  //    change state of a task
  function changeStatus(id) {
    setTasks(prev => {
      return prev.map(task => {
        return task.id === id ? { ...task, status: !task.status } : task;
      })
    })

  }
  //    Delete a task
  function deleteTask(id) {
    setTasks(prev => {
      return prev.filter(t => t.id !== id)
    })
  }
  //    Filter out tasks to render for completed , uncompleted and All
  function filterBasedOnCategory(task) {
    if (currentCategory === 'All') return true
    var val = (currentCategory === "true")
    if (val === task.status) return true
    return false

  }
  //    get data from local stroage on start
  useEffect(() => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    }
    setTasks(JSON.parse(localStorage.getItem('todos')));
  }, [])
  //    update data on local storage which triggers on every change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(Tasks));
  }, [Tasks])

  return (
    <>
      <Container className="my-4">
        <h1 className="m-auto text-center text-light">TODO</h1>
        <div className="input-group my-4 mx-auto">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === "Enter" && createTask()}
            type="text"
            className="form-control"
            placeholder="Task Description"
            aria-label="Task Description"
            aria-describedby="basic-addon2"
            required />

          <div className="input-group-append">
            <Button variant="primary" type="button" onClick={(e) => createTask(e)}><FontAwesomeIcon icon={faPlus} /></Button>
          </div>
        </div>

        <div className="mx-auto my-4" style={{ maxWidth: "30rem" }}>
          <Stack direction="vertical" gap={2} >

            <Form.Select onChange={(e) => setCurrentCategory(e.target.value)} size="sm" className="m-auto">
              <option value={"All"}>All</option>
              <option value={true}>Completed</option>
              <option value={false}>Uncomplete</option>
            </Form.Select>
            {
              Tasks.filter(filterBasedOnCategory).map((task) => {
                var classNamesForText = ["ms-2 me-auto"]
                task.status === true && classNamesForText.push("text-muted text-decoration-line-through")
                return (
                  <Stack key={task.id} direction="horizontal" className="text-light d-flex align-items-baseline" gap={3}>
                    <div className={classNamesForText.join(" ")}>{task.title}</div>

                    <Button onClick={() => changeStatus(task.id)}
                      variant="primary"><FontAwesomeIcon icon={faCheck} /></Button>
                    <Button onClick={() => deleteTask(task.id)}
                      variant="danger"><FontAwesomeIcon icon={faTimes} /></Button>

                  </Stack>
                )
              })}</Stack>
        </div>

      </Container>
    </>
  );
}

export default App;
