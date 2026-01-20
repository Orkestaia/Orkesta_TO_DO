'use client'

import { useTransition } from 'react'
import { CheckCircle2, Circle, Clock, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toggleTaskStatus } from '@/actions/tasks'

// Minimal Task Type for props
interface TaskProps {
    task: {
        id: string
        title: string
        priority: string
        status: string
        dueDate: Date | string | null
        project?: { name: string, color?: string | null } | null
        labels?: string | null
    }
}

export function TaskCard({ task }: TaskProps) {
    const [isPending, startTransition] = useTransition()

    const handleToggle = () => {
        startTransition(() => {
            toggleTaskStatus(task.id, task.status)
        })
    }

    const isDone = task.status === 'done'

    const priorityColor = (p: string) => {
        switch (p) {
            case 'P1': return 'text-red-400 border-red-900/50 bg-red-900/20'
            case 'P2': return 'text-orange-400 border-orange-900/50 bg-orange-900/20'
            case 'P3': return 'text-blue-400 border-blue-900/50 bg-blue-900/20'
            default: return 'text-neutral-500 border-neutral-800 bg-neutral-900/50'
        }
    }

    return (
        <div className={cn(
            "group flex items-center gap-3 p-3 rounded-lg border bg-neutral-900/30 transition-all hover:bg-neutral-800/50",
            isDone ? "border-neutral-800 opacity-50" : "border-neutral-800"
        )}>
            <button
                onClick={handleToggle}
                disabled={isPending}
                className="text-neutral-500 hover:text-purple-400 transition-colors"
            >
                {isDone ? <CheckCircle2 size={20} className="text-purple-500" /> : <Circle size={20} />}
            </button>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className={cn("text-sm font-medium truncate", isDone && "line-through text-neutral-500")}>
                        {task.title}
                    </span>
                    <span className={cn("text-[10px] px-1.5 py-0.5 rounded border font-mono", priorityColor(task.priority))}>
                        {task.priority}
                    </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-neutral-500">
                    {task.project && (
                        <span className="flex items-center gap-1 text-neutral-400">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: task.project.color || '#666' }} />
                            {task.project.name}
                        </span>
                    )}
                    {task.dueDate && (
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
