import { match } from "ts-pattern";
import { Status } from "../lib/task";
import { twMerge } from "tailwind-merge";

export interface StatusDisplayProps {
    status: Status
}

export default function StatusDisplay({ status }: StatusDisplayProps) {
    const color = match(status)
        .with(Status.Pending, () => `text-[#ECAB55]`)
        .with(Status.Todo, () => `text-[#5FB0F8]`)
        .with(Status.Completed, () => `text-[#42DE37]`)
        .exhaustive();

    const backgroundColor = match(status)
        .with(Status.Pending, () => `bg-[#896C2E]`)
        .with(Status.Todo, () => `bg-[#2E7A89]`)
        .with(Status.Completed, () => `bg-[#579343]`)
        .exhaustive();

    return <p className={twMerge(color, backgroundColor, `uppercase rounded px-1 py-0.5`)}>{status}</p>
}