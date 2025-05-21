"use client"

import { useState, useEffect } from "react"
import TaskForm from "@/components/task-form"
import TaskList from "@/components/task-list"
import FilterControls from "@/components/filter-controls"
import styles from "./page.module.css"

export type Task = {
  id: string
  title: string
  description: string
  completed: boolean
}

export type FilterType = "all" | "completed" | "pending"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setEditingTask(null)
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const startEditing = (task: Task) => {
    setEditingTask(task)
  }

  const cancelEditing = () => {
    setEditingTask(null)
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Task Manager</h1>

      <TaskForm onAddTask={addTask} editingTask={editingTask} onUpdateTask={updateTask} onCancelEdit={cancelEditing} />

      <FilterControls currentFilter={filter} onFilterChange={setFilter} />

      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggleComplete={toggleTaskCompletion}
        onEdit={startEditing}
      />
    </main>
  )
}
