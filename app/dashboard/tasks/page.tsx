/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckSquare, Plus, User } from "lucide-react"

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    project: "",
    assignee: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Mock data
  const projects = [
    { id: "1", name: "Website Redesign" },
    { id: "2", name: "Mobile App" },
    { id: "3", name: "Marketing Campaign" },
  ]

  const users = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Alex Johnson" },
  ]

  const handleCreateTask = () => {
    if (newTask.title.trim() === "") return

    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      project: newTask.project,
      assignee: newTask.assignee,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    setTasks([...tasks, task])
    setNewTask({ title: "", description: "", project: "", assignee: "" })
    setIsDialogOpen(false)
  }

  const getProjectName = (id: string) => {
    const project = projects.find((p) => p.id === id)
    return project ? project.name : "Unknown Project"
  }

  const getAssigneeName = (id: string) => {
    const user = users.find((u) => u.id === id)
    return user ? user.name : "Unassigned"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground w-56 md:w-full">Manage your tasks and track progress.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Add a new task and assign it to a project and team member.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select value={newTask.project} onValueChange={(value) => setNewTask({ ...newTask, project: value })}>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignee">Assign To</Label>
                <Select value={newTask.assignee} onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}>
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Select a team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {tasks.length === 0 ? (
        <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckSquare className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">No tasks yet</h2>
          <p className="mb-4 mt-2 text-center text-muted-foreground">Create your first task to get started.</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Task
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
                <CardDescription>{getProjectName(task.project)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{task.description || "No description provided."}</p>
                <div className="mt-4 flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{getAssigneeName(task.assignee)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Mark Complete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

