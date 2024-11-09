import { LiveMonitor } from '@/components/live-monitor'
import { Brain } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LivePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex flex-1 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Brain className="h-6 w-6" />
              <span className="font-semibold">FactFlow Live</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  Back to Search
                </Button>
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center gap-6 py-8 md:py-12">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="font-bold tracking-tighter text-4xl">
              Live Fact-Checking
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Monitor conversations, debates, or media in real-time for instant fact verification
            </p>
          </div>

          <div className="w-full max-w-4xl">
            <LiveMonitor />
          </div>
        </section>
      </main>
    </div>
  )
}