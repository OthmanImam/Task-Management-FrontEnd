import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FolderKanban } from "lucide-react"

export default function DashboardPage() {
  // Mock data
  const stats = [
    {
      title: "Total Projects",
      value: "3",
      icon: FolderKanban,
      description: "Active projects",
    },
    {
      title: "Total Tasks",
      value: "12",
      icon: CheckCircle,
      description: "Across all projects",
    },
    {
      title: "Pending Tasks",
      value: "5",
      icon: Clock,
      description: "Tasks awaiting completion",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your task management dashboard.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-2 border-accent shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="rounded-full bg-primary/10 p-2">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full border-2 border-accent shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent projects and tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-md hover:bg-accent/30 transition-colors">
                <div className="rounded-full bg-primary/10 p-2">
                  <FolderKanban className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Website Redesign</p>
                  <p className="text-sm text-muted-foreground">Project created 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-md hover:bg-accent/30 transition-colors">
                <div className="rounded-full bg-primary/10 p-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Update homepage layout</p>
                  <p className="text-sm text-muted-foreground">Task completed 1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-md hover:bg-accent/30 transition-colors">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Design new logo</p>
                  <p className="text-sm text-muted-foreground">Task due in 3 days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

