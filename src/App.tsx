import { useState } from 'react'

interface Task {
  content: string
}

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);


  const appendTask = (task: string) => {
    setTasks([{ content: task }, ...tasks])
  }

  return <div className="gap-2 p-2">
    <div className="flex gap-2">
      <input className="border-2 border-black rounded p-1" placeholder="Task description" onChange={(e) => setInput(e.target.value)} />
      <button className="border-2 border-black rounded  p-1" onClick={() => appendTask(input)}>Add task</button>
    </div>

    <div className="flex flex-col gap-2">
      {tasks.map((task, i) => <>
        <p>{task.content}</p>
        {i != tasks.length - 1 ? <div className="bg-gray-300 h-0.5 rounded" /> : null}
      </>)}
    </div>
  </div>

}

export default App