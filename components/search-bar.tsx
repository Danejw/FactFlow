"use client"

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export function SearchBar() {
  const [claim, setClaim] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!claim.trim()) {
      toast({
        title: "Please enter a claim",
        description: "Enter a statement or claim you'd like to verify.",
        variant: "destructive",
      })
      return
    }
    // TODO: Implement claim verification logic
    toast({
      title: "Researching your claim",
      description: "Our AI is analyzing multiple sources to verify your claim.",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Enter a claim to verify..."
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          className="pl-9"
        />
      </div>
      <Button type="submit">Verify</Button>
    </form>
  )
}