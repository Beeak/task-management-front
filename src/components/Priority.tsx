import { match } from "ts-pattern";
import { Priority } from "../lib/task";
import { twMerge } from "tailwind-merge";

export interface PriorityDisplayProps {
    priority: Priority
}
export default function PriorityDisplay({ priority }: PriorityDisplayProps) {
    const color = match(priority)
        .with(Priority.Uregent, () => `text-red-light`)
        .with(Priority.High, () => `text-orange-dark`)
        .with(Priority.Low, () => `text-blue-light`)
        .exhaustive();

    const backgroundColor = match(priority)
        .with(Priority.Uregent, () => `bg-red-dark`)
        .with(Priority.High, () => `bg-orange-light`)
        .with(Priority.Low, () => `bg-blue-dark`)
        .exhaustive();

    return <p className={twMerge(color, backgroundColor, `uppercase rounded px-1 py-0.5`)}>{priority}</p>
}