import { createFileRoute } from '@tanstack/react-router'
import { NewTask, TaskRow } from '../components/Row'
import { Status } from '../lib/task'

export const Route = createFileRoute('/')({
    component: () => <Index />,
})

function Index() {
    return <div className="flex flex-col gap-1.5 p-2">
        <NewTask className="self-end" />

        <div className="flex flex-col gap-2">
            <TaskRow status={Status.Pending} />
            <TaskRow status={Status.Todo} />
            <TaskRow status={Status.Completed} />
        </div>

    </div>
}