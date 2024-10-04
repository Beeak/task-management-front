import { create } from "zustand";
import { v4 } from "uuid"
import { Priority, Status, Task } from "./task";
import { createJSONStorage, persist } from "zustand/middleware";

interface TaskState {
    tasks: Task[],
    addTask: (description: string, priority: Priority) => void;
    updateTask: (modifiedTask: Task) => void;
    removeTask: (targetTask: Task) => void;
}

export const useTaskStore = create<TaskState>()(persist((set) => ({
    tasks: [],
    addTask: (description: string, priority: Priority) => {
        const task: Task = {
            id: v4(),
            description,
            priority,
            status: Status.Pending,
        };

        set((state) => ({
            tasks: [...state.tasks, task]
        }))
    },
    updateTask: (modifiedTask: Task) => {
        set((state) => {
            const modifiedTasks = state.tasks.map((task) => task.id == modifiedTask.id ? modifiedTask : task);

            return {
                tasks: modifiedTasks,
            }
        })
    },
    removeTask: (targetTask: Task) => {
        set((state) => {
            const modifiedTasks = state.tasks.filter((task) => targetTask.id != task.id);

            return {
                tasks: modifiedTasks
            }
        })
    }
}), {
    name: "taskStorage",
    storage: createJSONStorage(() => localStorage)
}))