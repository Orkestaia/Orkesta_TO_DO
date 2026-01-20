import { Button } from "@/components/ui/Button"
import { TaskCard } from "@/components/features/task/TaskCard"
import { getTodayTasks } from "@/actions/tasks"
import { LayoutDashboard } from "lucide-react"

export default async function Home() {
  const tasks = await getTodayTasks()

  // Serialize dates for client components
  const serializedTasks = tasks.map(t => ({
    ...t,
    dueDate: t.dueDate ? t.dueDate.toISOString() : null,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
    completedAt: t.completedAt ? t.completedAt.toISOString() : null,
  }))

  const p1Tasks = serializedTasks.filter(t => t.priority === 'P1')
  const p2Tasks = serializedTasks.filter(t => t.priority === 'P2')
  const restTasks = serializedTasks.filter(t => t.priority !== 'P1' && t.priority !== 'P2')

  const now = new Date()
  const dateStr = now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
  const capitalDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1)

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Hoy</h1>
          <p className="text-neutral-400 text-sm">{capitalDate}</p>
        </div>
        <Button>Plan del día</Button>
      </header>

      <div className="space-y-8">
        {/* P1 Section */}
        <section>
          <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-2">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Prioridad P1</h2>
            <span className="text-xs text-neutral-600 font-mono">{p1Tasks.length}/5 Active</span>
          </div>

          {p1Tasks.length === 0 ? (
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8 text-center text-neutral-500">
              <LayoutDashboard className="mx-auto mb-2 opacity-50" />
              <p>No tienes tareas P1 para hoy.</p>
            </div>
          ) : (
            <div className="grid gap-2">
              {p1Tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </section>

        {/* P2 Section */}
        {p2Tasks.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">Importante (P2)</h2>
            <div className="grid gap-2">
              {p2Tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </section>
        )}

        {/* Rest Section */}
        <section>
          <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">Resto del día</h2>
          {restTasks.length === 0 ? (
            <div className="text-neutral-500 text-sm pl-2 italic">
              Sin más tareas pendientes.
            </div>
          ) : (
            <div className="grid gap-2">
              {restTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
