export enum Status {
    Pending = "pending",
    Todo = "todo",
    Completed = "completed"
}

export enum Priority {
    Low = "low",
    High = "high",
    Uregent = "urgent"
}

export interface Task {
    id: string;

    status: Status,
    priority: Priority
    description: string,
}

