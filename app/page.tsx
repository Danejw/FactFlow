import { SearchBar } from '@/components/search-bar'
import { ModeToggle } from '@/components/mode-toggle'
import { Brain, CheckCircle, Search, Radio, Zap, Shield, Clock, Users, ArrowRight, Globe2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6" />
              <span className="font-semibold">FactFlow</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/live">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Radio className="h-4 w-4" />
                  Live Mode
                </Button>
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <Badge variant="secondary" className="h-6 items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by Advanced AI
            </Badge>
            <h1 className="font-bold tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Verify claims instantly with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                AI-powered research
              </span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Enter any claim or statement to fact-check. Our AI will research and verify it in seconds, providing you with accurate, reliable information.
            </p>
            <div className="w-full max-w-2xl">
              <SearchBar />
            </div>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24 border-t bg-muted/40">
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-bold">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Get verified results in seconds, not minutes or hours
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-bold">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced language models analyze and verify claims
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-bold">Reliable Sources</h3>
                <p className="text-sm text-muted-foreground">
                  Cross-referenced data from trusted sources
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Real-time fact-checking for the digital age
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Don't let misinformation spread. Whether you're a journalist, researcher, or curious mind,
              FactFlow helps you separate fact from fiction in real-time.
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3 mt-8">
            <div className="relative overflow-hidden rounded-xl border bg-background p-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col gap-2">
                <Clock className="h-8 w-8 text-primary" />
                <h3 className="font-bold text-xl mt-4">Real-Time Verification</h3>
                <p className="text-muted-foreground">
                  Monitor live conversations and get instant fact-checks as claims are made
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border bg-background p-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col gap-2">
                <Globe2 className="h-8 w-8 text-primary" />
                <h3 className="font-bold text-xl mt-4">Global Sources</h3>
                <p className="text-muted-foreground">
                  Access information from trusted sources worldwide for comprehensive verification
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border bg-background p-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col gap-2">
                <Users className="h-8 w-8 text-primary" />
                <h3 className="font-bold text-xl mt-4">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  Share verified facts with your team and collaborate on research
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/40">
          <div className="container py-12 md:py-16 lg:py-20">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                Ready to uncover the truth?
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mb-4">
                Join thousands of professionals who trust FactFlow for accurate, real-time fact verification
              </p>
              <Link href="/live">
                <Button size="lg" className="gap-2">
                  Try Live Fact-Checking
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Brain className="h-6 w-6" />
            <p className="text-center text-sm leading-loose md:text-left">
              Built with AI. Powered by truth.
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2024 FactFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}