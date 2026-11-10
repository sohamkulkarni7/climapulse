const steps = [
  { title: 'Environmental data', body: 'Hourly rainfall, temperature, humidity and wind from Open-Meteo.' },
  { title: 'Local context', body: 'Terrain, drainage capacity and built-up density for each area.' },
  { title: 'Risk scoring', body: 'A transparent weighted model produces 0–100 scores.' },
  { title: 'Timeline', body: 'Six-hour windows across the next three days show when risk peaks.' },
  { title: 'Preventive action', body: 'Practical guidance before risk becomes disaster.' },
]

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="text-3xl font-semibold tracking-tight">From data to action in five steps</h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-2 rounded-xl border border-border p-5">
              <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
