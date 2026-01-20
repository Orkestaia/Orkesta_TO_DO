'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Folder,
    ChevronRight,
    ChevronDown,
    Home,
    Settings,
    Inbox,
    Calendar,
    LayoutDashboard
} from 'lucide-react'
import { cn } from '@/lib/utils'

type ProjectHelpers = {
    id: string;
    name: string;
    children: { id: string; name: string }[]
}

export function Sidebar({ projects }: { projects: ProjectHelpers[] }) {
    const pathname = usePathname()
    const [expanded, setExpanded] = useState<string[]>([])

    const toggleExpand = (id: string) => {
        setExpanded(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        )
    }

    return (
        <aside className="w-64 border-r h-screen bg-neutral-900 text-white flex flex-col fixed left-0 top-0 overflow-y-auto">
            {/* Header */}
            <div className="p-4 flex items-center gap-2 border-b border-neutral-800">
                <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
                    {/* Logo placeholder */}
                    <span className="font-bold">O</span>
                </div>
                <span className="font-bold text-lg tracking-tight">Orkesta</span>
            </div>

            {/* Main Nav */}
            <div className="p-2 space-y-1">
                <NavItem href="/" icon={Home} label="Today" active={pathname === '/'} />
                <NavItem href="/upcoming" icon={Calendar} label="Upcoming" active={pathname === '/upcoming'} />
                <NavItem href="/inbox" icon={Inbox} label="Inbox" active={pathname === '/inbox'} />
            </div>

            <div className="border-t border-neutral-800 my-2" />

            {/* Projects */}
            <div className="flex-1 p-2 space-y-1">
                <div className="px-2 text-xs font-semibold text-neutral-500 uppercase mb-2">Projects</div>
                {projects.map(project => (
                    <div key={project.id}>
                        <button
                            onClick={() => toggleExpand(project.id)}
                            className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-neutral-800 rounded-md text-sm text-neutral-300 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <Folder size={14} className="text-neutral-500" />
                                <span>{project.name.replace(/^\d+_/, '')}</span> {/* Remove 01_ prefix for display */}
                            </div>
                            {project.children.length > 0 && (
                                expanded.includes(project.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                            )}
                        </button>

                        {expanded.includes(project.id) && (
                            <div className="pl-6 space-y-0.5 mt-1">
                                {project.children.map(child => (
                                    <Link
                                        key={child.id}
                                        href={`/project/${child.id}`}
                                        className={cn(
                                            "block px-2 py-1.5 rounded-md text-sm transition-colors",
                                            pathname === `/project/${child.id}`
                                                ? "bg-purple-900/50 text-purple-200"
                                                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                                        )}
                                    >
                                        {child.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-2 mt-auto border-t border-neutral-800">
                <NavItem href="/settings" icon={Settings} label="Settings" active={pathname === '/settings'} />
            </div>
        </aside>
    )
}

function NavItem({ href, icon: Icon, label, active }: any) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-2 px-2 py-2 rounded-md transition-colors text-sm",
                active ? "bg-purple-600 text-white font-medium" : "text-neutral-400 hover:text-white hover:bg-neutral-800"
            )}
        >
            <Icon size={18} />
            {label}
        </Link>
    )
}
