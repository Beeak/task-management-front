import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTaskStore } from "../lib/store";
import { Priority, Status, Task } from "../lib/task";
import { match } from "ts-pattern";
import { twMerge } from "tailwind-merge";
import PriorityDisplay from "./Priority";
import StatusDisplay from "./Status";
import { Input } from "./Input";

interface Inputs {
    description: string;
    priority: Priority;
}

export function NewTask({ className }: { className?: string }) {
    const store = useTaskStore();
    const { register, handleSubmit, control, watch, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        store.addTask(data.description, data.priority);
        reset()
    };

    return (
        <form className={twMerge("flex gap-2", className)} onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("description")} placeholder="Task description" />
            <div className="flex gap-1">
                <Controller
                    name="priority"
                    defaultValue={Priority.Low}
                    control={control}
                    render={({ field }) => {
                        const priority = watch("priority") ?? Priority.Low;
                        
                        const onChange = (e: React.SyntheticEvent) => {
                            e.preventDefault();

                            const newPriority = match(priority)
                                .with(Priority.Uregent, () => Priority.Low)
                                .with(Priority.High, () => Priority.Uregent)
                                .with(Priority.Low, () => Priority.High)
                                .exhaustive();

                            field.onChange(newPriority);
                        };

                        const color = match(priority)
                            .with(Priority.Uregent, () => `text-red-600`)
                            .with(Priority.High, () => `text-orange-500`)
                            .with(Priority.Low, () => `text-blue-400`)
                            .exhaustive();

                        return (
                            <button type="button" className={twMerge(color)} onClick={onChange}>
                                <PriorityDisplay priority={priority} />
                            </button>
                        );
                    }}
                />

                <input type="submit" value="Add" className="bg-green-dark text-white rounded px-1 py-0.5" />
            </div>

        </form>
    );
}

export function TaskRow({ status }: { status: Status }) {
    const store = useTaskStore();
    const tasks = store.tasks.filter((task) => task.status == status);

    return <div>
        <p className="rounded-t bg-[#3C3D37] w-32 text-white text-center uppercase">{status}</p>
        <div className="flex flex-col gap-2 w-full min-h-16 bg-[#5B6457] rounded-b py-1 px-2">
            {tasks.map((task, idx) => {
                return <div className="flex flex-col gap-2" key={task.id}>
                    <TaskDisplay task={task} />
                    {idx != tasks.length - 1 ? <div className="bg-gray-400 h-px" /> : null}
                </div>
            })}
        </div>
    </div>


}

export function TaskDisplay({ task }: { task: Task }) {
    const store = useTaskStore();

    const nextStatus = match(task.status)
        .with(Status.Pending, () => Status.Todo)
        .with(Status.Todo, () => Status.Completed)
        .with(Status.Completed, () => Status.Pending)
        .exhaustive()

    const onClickMove = (e: React.SyntheticEvent) => {
        e.preventDefault();

        store.updateTask({
            ...task,
            status: nextStatus,
        });
    }

    const onClickDelete = (e: React.SyntheticEvent) => {
        e.preventDefault();

        store.removeTask(task);
    }

    return <div className="flex items-center gap-1">
        <div className="h-1.5 w-1.5 bg-white rounded-full" />
        <p className="text-white">{task.description}</p>
        <PriorityDisplay priority={task.priority} />
        <button onClick={onClickMove} className="flex items-center gap-2 text-white">Move to <StatusDisplay status={nextStatus} /></button>
        <button onClick={onClickDelete} className="bg-[#530202] text-[#FF2222] rounded px-2 py-0.5">DELETE</button>
    </div>
}