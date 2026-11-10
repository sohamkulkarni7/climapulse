import Link from 'next/link'
import { Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[1000] border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Activity className="size-4" aria-hidden="true" />
          </span>
          ClimaPulse <span className="text-primary">AI</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm">
          <Link href="/#how" className="hidden rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground sm:block">
            How it works
          </Link>
          <Link href="/#method" className="hidden rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground sm:block">
            Methodology
          </Link>
          <Button size="sm" nativeButton={false} render={<Link href="/dashboard" />}>
            Open dashboard
          </Button>
        </nav>
      </div>
    </header>
  )
}
