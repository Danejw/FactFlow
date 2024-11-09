import { SearchBar } from '@/components/search-bar'
import { ModeToggle } from '@/components/mode-toggle'
import { Brain, CheckCircle, Search, Radio, Zap, Shield, Clock, Users, ArrowRight, Globe2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-background dark:to-gray-900" />
        <div className="absolute -top-[40rem] left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-[20rem]" aria-hidden="true">
          <div
            className="aspect-[1200/900] w-[75rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-10 dark:opacity-20"
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

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
        <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
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

        <section className="relative border-t bg-muted/60 dark:bg-muted/40">
          <div className="container space-y-6 py-8 md:py-12 lg:py-24">
            <h2 className="text-2xl font-bold text-center">Our Key Features</h2>
            <p className="text-center text-muted-foreground">
              Discover how FactFlow empowers you with advanced tools for fact-checking.
            </p>
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f620,transparent)]"></div>
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
          </div>
        </section>

        <section className="relative border-t bg-background/80">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(45deg,#80808008_1px,transparent_1px),linear-gradient(-45deg,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/30 via-white/0 to-white/30 dark:from-white/[0.05] dark:via-transparent dark:to-white/[0.05]"></div>
          <div className="container py-8 md:py-12 lg:py-24">
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
              <div className="relative overflow-hidden rounded-xl border bg-background/60 backdrop-blur-sm p-8 hover:shadow-lg transition-all hover:-translate-y-1 hover:bg-background">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
                <div className="flex flex-col gap-2">
                  <Clock className="h-8 w-8 text-primary" />
                  <h3 className="font-bold text-xl mt-4">Real-Time Verification</h3>
                  <p className="text-muted-foreground">
                    Monitor live conversations and get instant fact-checks as claims are made
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl border bg-background/60 backdrop-blur-sm p-8 hover:shadow-lg transition-all hover:-translate-y-1 hover:bg-background">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
                <div className="flex flex-col gap-2">
                  <Globe2 className="h-8 w-8 text-primary" />
                  <h3 className="font-bold text-xl mt-4">Global Sources</h3>
                  <p className="text-muted-foreground">
                    Access information from trusted sources worldwide for comprehensive verification
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl border bg-background/60 backdrop-blur-sm p-8 hover:shadow-lg transition-all hover:-translate-y-1 hover:bg-background">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
                <div className="flex flex-col gap-2">
                  <Users className="h-8 w-8 text-primary" />
                  <h3 className="font-bold text-xl mt-4">Team Collaboration</h3>
                  <p className="text-muted-foreground">
                    Share verified facts with your team and collaborate on research
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-t bg-muted/60 dark:bg-muted/40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_100%_200px,#3b82f615,transparent)]"></div>
          <div className="container py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                Trusted by researchers worldwide
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                See what our users are saying about their experience with FactFlow
              </p>
            </div>

            <div className="mt-12 px-4 md:px-8">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full max-w-5xl mx-auto"
              >
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="border-2">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar>
                              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                {testimonial.name[0]}
                              </div>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                            </div>
                          </div>
                          <div className="flex gap-0.5 mb-3">
                            {Array(5).fill(null).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{testimonial.content}</p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>
          </div>
        </section>

        <section className="relative border-t bg-background/80">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-background"></div>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_400px,#3b82f610,transparent)]"></div>
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

      <footer className="border-t py-6 md:py-0 bg-muted/40">
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

const testimonials = [
  {
    name: "Sarah Chen",
    title: "Research Analyst",
    content: "FactFlow has revolutionized how I verify information. The AI-powered research is incredibly fast and accurate.",
  },
  {
    name: "Michael Rodriguez",
    title: "Journalist",
    content: "As a journalist, fact-checking is crucial. FactFlow helps me maintain accuracy in my reporting with its real-time verification.",
  },
  {
    name: "Dr. Emily Thompson",
    title: "Academic Researcher",
    content: "The depth and accuracy of FactFlow's analysis is impressive. It's become an essential tool in my research workflow.",
  },
  {
    name: "James Wilson",
    title: "Content Strategist",
    content: "FactFlow's instant verification has saved me countless hours of manual research. It's a game-changer for content creation.",
  },
  {
    name: "Lisa Patel",
    title: "Digital Media Manager",
    content: "The live fact-checking feature is incredible. It helps us maintain accuracy in real-time during live events and discussions.",
  }
]