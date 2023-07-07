import React, { useEffect, useState } from 'react'
import Model from './component/Model'
import { formatDate } from './utaltis'
import Table from './component/Table'
import SearchBar from './component/SearchBar'
import Filter from './component/Filter'

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  })
  const [dataToShow, setDataToShow] = useState(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  const [isOpen, setIsOpen] = useState(false)
  const [TasktoUpd, setTasktoUpd] = useState({
    id: 0,
    name: '',
    done: false,
    priority: '',
  })

  const [filterOn, setFilter] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
      setDataToShow(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    setDataToShow(tasks)
  }, [tasks])
  const handleSearch = (e: any) => {
    const searchTerm = e.target.value.toLowerCase()
    setSearchTerm(searchTerm)

    if (searchTerm.trim() === '') {
      setDataToShow([...tasks])
    } else {
      const filteredTasks = tasks.filter((task: any) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setDataToShow(filteredTasks)
    }
  }

  const handleChecked = (index: number) => {
    setTasks((prevTasks: any) => {
      const updatedTasks = [...prevTasks]
      updatedTasks[index] = {
        ...updatedTasks[index],
        done: !updatedTasks[index].done,
      }
      return updatedTasks
    })
  }
  const handleDelete = (index: number) => {
    setTasks((prevTasks: any) => {
      const tasks = [...prevTasks]
      let taskAfterDele = tasks.filter((task, id) => id !== index)
      return taskAfterDele
    })
  }
  const handleUpdate = (index: number) => {
    setIsOpen(true)
    let taskToUpd = tasks.filter((task: any, id: any) => id == index)
    setTasktoUpd(taskToUpd[0])
  }
  const onSave = (index: number, Newtask: string, priority: string) => {
    console.log('index', index, Newtask, 'Newtask', priority, 'priority')
    if (index > 0) {
      setTasks((prevTasks: any) => {
        let taskToUpd = prevTasks.map((task: any) => {
          if (task.id === index) {
            return { ...task, name: Newtask, priority: priority }
          }
          return task
        })
        setTasktoUpd({ id: 0, name: '', done: false, priority: '' })

        return taskToUpd
      })
    } else {
      const today = new Date()
      const formattedDate = formatDate(today)

      const newTask = {
        id: Math.floor(Math.random() * 1000000) + 2,
        name: Newtask,
        done: false,
        dateAdded: formattedDate,
        priority: priority,
      }
      setTasks((prevTasks: any) => [...prevTasks, newTask])
    }

    closeModel()
  }

  const closeModel = () => {
    setIsOpen(false)
  }
  const handleFilter = (e: any, filterON: string) => {
    setDataToShow(tasks)
    setFilter(e.target.value)

    if (e.target.value == '') {
      setDataToShow(tasks)
    } else {
      setDataToShow((prev: any) => {
        let filterdData = [...prev]
        filterdData = filterdData.filter(
          (task) => String(task[filterON]) == e.target.value,
        )

        console.log(filterdData, 'filterdData')
        return filterdData
      })
    }
  }
  const sortTasksByPriority = (sortBy: number) => {
    const sortedData = [...dataToShow].sort((task1, task2) => {
      const priority1 = task1.priority
      const priority2 = task2.priority

      const priorityOrder = ['Low', 'Medium', 'High']

      const priorityIndex1 = priorityOrder.indexOf(priority1)
      const priorityIndex2 = priorityOrder.indexOf(priority2)

      if (priorityIndex1 < priorityIndex2) {
        return sortBy == -1 ? -1 : 1
      } else if (priorityIndex1 > priorityIndex2) {
        return sortBy == -1 ? 1 : -1
      } else {
        return 0
      }
    })

    setDataToShow(sortedData)
  }

  return (
    <div className="p-4">
      <div>
        <h2 className="text-2xl font-semibold leading-tight">To Do List</h2>
      </div>
      {isOpen && (
        <Model closeModel={closeModel} task={TasktoUpd} onSave={onSave} />
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:space-x-4 mt-9">
        <button
          className="bg-red-400 hover:bg-green-100 text-white font-bold py-2 px-4 rounded md:absolute md:top-0 md:right-0 md:mt-4 md:mr-4"
          onClick={() => setIsOpen(true)}
        >
          Add New Task
        </button>
        <div className=" gap-2 flex flex-col md:flex-row md:justify-end md:gap-2 mt-4 md:mt-0">
          <SearchBar handleSearch={handleSearch} searchTerm={searchTerm} />
          <Filter
            filterON={'done'}
            handleFilter={handleFilter}
            filterOption={[
              { name: 'All', value: '' },
              { name: 'Completed', value: 'true' },
              { name: 'Pending', value: 'false' },
            ]}
          />
          <button
            className="bg-red-400 hover:bg-green-100 text-white font-bold py-2 px-4 rounded  "
            onClick={() => sortTasksByPriority(1)}
          >
            sort form high to low
          </button>
          <button
            className="bg-green-400 hover:bg-green-100 text-white font-bold py-2 px-4 rounded "
            onClick={() => sortTasksByPriority(-1)}
          >
            sort form low to high
          </button>
          {/* <Filter
            filterON={'priority'}
            handleFilter={handleFilter}
            filterOption={[
              { name: 'All', value: '' },
              { name: 'High', value: 'High' },
              { name: 'Medium', value: 'Medium' },
              { name: 'Low', value: 'Low' },
            ]}
          /> */}
        </div>
      </div>
      <Table
        dataToShow={dataToShow}
        handleChecked={handleChecked}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  )
}

export default App
