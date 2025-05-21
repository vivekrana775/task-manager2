"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Task } from "@/app/page"
import styles from "./task-form.module.css"

interface TaskFormProps {
  onAddTask: (title: string, description: string) => void
  editingTask: Task | null
  onUpdateTask: (task: Task) => void
  onCancelEdit: () => void
}

export default function TaskForm({ onAddTask, editingTask, onUpdateTask, onCancelEdit }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
    } else {
      setTitle("")
      setDescription("")
    }
  }, [editingTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        title,
        description,
      })
    } else {
      onAddTask(title, description)
    }

    setTitle("")
    setDescription("")
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>{editingTask ? "Edit Task" : "Add New Task"}</h2>

      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          placeholder="Enter task description"
          rows={3}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button type="button" onClick={onCancelEdit} className={styles.cancelButton}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
