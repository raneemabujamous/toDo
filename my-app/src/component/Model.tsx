import React, { useEffect, useState } from 'react'

interface Props {
  closeModel: () => void
  task?: any
  onSave: (id: number, task: string, priority: string) => void
}

const Model: React.FC<Props> = ({ closeModel, task, onSave }) => {
  const [value, setValue] = useState('')
  const [priority, setPriority] = useState('Low')

  useEffect(() => {
    if (task && task.name.length > 1) {
      setValue(task.name)
      setPriority(task.priority)
    }
  }, [task])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-2/3 absolute bg-white  rounded shadow-lg p-6 md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Task Management</h2>
        <div className="mb-4">
          <label htmlFor="taskName">Task Name</label>
          <input
            id="taskName"
            className="w-full border border-gray-300 px-4 py-2 rounded mt-2 focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={task?.name ? task.name : 'Add new task'}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="taskPriority">Task Priority</label>
          <select
            id="taskPriority"
            className="w-full appearance-none bg-white border border-gray-300  mt-2 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:ring focus:border-blue-500"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onSave(task?.id, value, priority)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            onClick={closeModel}
            className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Model
