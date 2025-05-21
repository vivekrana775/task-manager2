"use client"

import type { Task } from "@/app/page"
import styles from "./task-list.module.css"

interface TaskListProps {
  tasks: Task[]
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
  onEdit: (task: Task) => void
}

export default function TaskList({ tasks, onDelete, onToggleComplete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No tasks found. Add a new task to get started!</p>
      </div>
    )
  }

  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <div key={task.id} className={`${styles.taskItem} ${task.completed ? styles.completed : ""}`}>
          <div className={styles.taskContent}>
            <div className={styles.taskHeader}>
              <h3 className={styles.taskTitle}>{task.title}</h3>
              <div className={styles.taskActions}>
                <button onClick={() => onEdit(task)} className={styles.editButton} aria-label="Edit task">
                  Edit
                </button>
                <button onClick={() => onDelete(task.id)} className={styles.deleteButton} aria-label="Delete task">
                  Delete
                </button>
              </div>
            </div>

            {task.description && <p className={styles.taskDescription}>{task.description}</p>}

            <div className={styles.taskStatus}>
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id)}
                  className={styles.checkbox}
                />
                <span className={styles.checkmark}></span>
                {task.completed ? "Completed" : "Mark as completed"}
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
