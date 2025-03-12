/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { FolderPlus, Plus, Users } from "lucide-react"
import React from "react"
import { projectApi, getProjectsApi } from "@/app/api/config/auth"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [newProject, setNewProject] = useState({ name: "", description: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    const isAdmin = localStorage.getItem('token')
    const role = localStorage.getItem('role')
  }, [])

  const handleCreateProject = (e: any) => {
    e.preventDefault()
    console.log(formData)
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
    // setNewProject(formData)
    // setIsDialogOpen(false)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log(formData)
    try {
      await projectApi(formData)
      setProjects([...projects, {
        name: formData.name,
        description: formData.description,
        createdAt: new Date().toISOString(),
      }])
      setIsDialogOpen(false)
      setFormData({
        name: '',
        description: ''
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjectsApi();
        setProjects(response.data.data.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);





  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your projects and assign tasks.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Add a new project to your workspace.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter project name"
                  value={formData.name}
                  type="text"
                  onChange={handleCreateProject}
                  className="border-input focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter project description"
                  value={formData.description}
                  onChange={handleCreateProject}
                  className="border-input focus-visible:ring-primary"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length === 0 ? (
        <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-accent">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <FolderPlus className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">No projects yet</h2>
          <p className="mb-4 mt-2 text-center text-muted-foreground">Create your first project to get started.</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Project
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="border-2 border-accent shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>Created on {new Date(project.createdAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{project.description || "No description provided."}</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{project.members}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{project.tasks} tasks</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2 hover:bg-accent/50 hover:text-accent-foreground">
                  <Plus className="h-4 w-4" />
                  Add Task
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

