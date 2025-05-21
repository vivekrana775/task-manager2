"use client"

import type { FilterType } from "@/app/page"
import styles from "./filter-controls.module.css"

interface FilterControlsProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export default function FilterControls({ currentFilter, onFilterChange }: FilterControlsProps) {
  return (
    <div className={styles.filterContainer}>
      <h2 className={styles.filterTitle}>Filter Tasks</h2>

      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${currentFilter === "all" ? styles.active : ""}`}
          onClick={() => onFilterChange("all")}
        >
          All
        </button>

        <button
          className={`${styles.filterButton} ${currentFilter === "pending" ? styles.active : ""}`}
          onClick={() => onFilterChange("pending")}
        >
          Pending
        </button>

        <button
          className={`${styles.filterButton} ${currentFilter === "completed" ? styles.active : ""}`}
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
