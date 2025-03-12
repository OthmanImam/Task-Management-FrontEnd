import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  // In a real app, check if user is authenticated
  // If authenticated, redirect to dashboard
  // For demo purposes, we'll just provide links

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="flex h-16 items-center justify-between px-10">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl text-primary">TaskMaster</span>
          </div>
          <nav className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 px-10">
        <section className="grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
              Manage your tasks <br className="hidden sm:inline" />
              with ease and simplicity
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              A simple task management tool to help you organize projects and tasks efficiently.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

