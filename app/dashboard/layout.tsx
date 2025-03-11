"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, FolderKanban, CheckSquare, LogOut, Menu, X } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const routes = [
    {
      href: "/dashboard",
      label: "Home",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/projects",
      label: "Projects",
      icon: FolderKanban,
      active: pathname === "/dashboard/projects",
    },
    {
      href: "/dashboard/tasks",
      label: "Tasks",
      icon: CheckSquare,
      active: pathname === "/dashboard/tasks",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl text-primary">TaskMaster</span>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          <nav className="hidden md:flex md:gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <aside className="fixed inset-0 top-16 z-30 h-[calc(100vh-4rem)] w-full overflow-y-auto border-r bg-background p-6 md:hidden">
            <nav className="flex flex-col gap-2">
              {routes.map((route) => (
                <Link key={route.href} href={route.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant={route.active ? "default" : "ghost"} className="w-full justify-start gap-2">
                    <route.icon className="h-4 w-4" />
                    {route.label}
                  </Button>
                </Link>
              ))}
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </Link>
            </nav>
          </aside>
        )}
        {/* Desktop Sidebar */}
        <aside className="hidden md:block">
          <nav className="sticky top-20 flex flex-col gap-2">
            {routes.map((route) => (
              <Link key={route.href} href={route.href}>
                <Button variant={route.active ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex w-full flex-col overflow-hidden py-6">{children}</main>
      </div>
    </div>
  )
}

