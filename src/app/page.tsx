import { Button } from "@/components/ui/Button"
import { TaskCard } from "@/components/features/task/TaskCard"
import { getTodayTasks } from "@/actions/tasks"
import { LayoutDashboard, SlidersHorizontal, CheckCircle2 } from "lucide-react"

export default async function Home() {
  const tasks = await getTodayTasks()

  const serializedTasks = tasks.map(t => ({
    ...t,
    dueDate: t.dueDate ? t.dueDate.toISOString() : null,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
    completedAt: t.completedAt ? t.completedAt.toISOString() : null,
  }))

  const p1Tasks = serializedTasks.filter(t => t.priority === 'P1')
  const restTasks = serializedTasks.filter(t => t.priority !== 'P1')

  const now = new Date()
  const dateStr = now.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'long' })
  const capitalDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1)

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-6 flex items-end gap-3 pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Hoy</h1>
        <span className="text-xs text-neutral-500 mb-1.5 font-medium">{capitalDate}</span>
      </header>

      {/* P1 Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[13px] font-bold text-neutral-800 dark:text-neutral-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            Prioridad Alta (P1)
          </h2>
          <span className="text-[11px] text-neutral-400">{p1Tasks.length}/5</span>
        </div>

        {p1Tasks.length === 0 ? (
          <div className="py-6 text-center text-neutral-400 text-sm border-b border-transparent">
            <CheckCircle2 size={16} className="mx-auto mb-2 opacity-30" />
            <p>Estás al día con tus prioridades.</p>
          </div>
        ) : (
          <div>
            {p1Tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      {/* Rest Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[13px] font-bold text-neutral-800 dark:text-neutral-300">
            Resto del día
          </h2>
        </div>

        {restTasks.length === 0 && p1Tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
            <div className="w-24 h-24 mb-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
              <LayoutDashboard size={40} className="opacity-20" />
            </div>
            <p className="text-sm">Todo limpio por hoy.</p>
            <Button variant="secondary" className="mt-4" size="sm">Planificar mañana</Button>
          </div>
        ) : (
          <div>
            {restTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
            {restTasks.length === 0 && (
              <p className="text-[13px] text-neutral-400 py-4 italic">No hay más tareas asignadas.</p>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button (Mobile) or Quick Add placeholder */}
      <div className="mt-4 group cursor-pointer flex items-center gap-2 text-neutral-500 hover:text-red-500 transition-colors px-2 py-2 -ml-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800">
        <div className="w-[18px] h-[18px] rounded-full border border-transparent group-hover:bg-red-500 text-white flex items-center justify-center transition-all bg-transparent">
          <PlusIcon className="w-4 h-4 text-red-500 group-hover:text-white" />
        </div>
        <span className="text-[14px]">Añadir tarea</span>
      </div>
    </div>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}
