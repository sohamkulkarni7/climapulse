const rows = [
  { risk: 'Flood', formula: '45% rainfall (24h) + 20% peak intensity + 20% low-lying terrain + 15% drainage weakness' },
  { risk: 'Waterlogging', formula: '40% peak intensity + 30% rainfall (24h) + 30% drainage weakness' },
  { risk: 'Heat', formula: '75% feels-like above 30°C + 25% built-up density' },
  { risk: 'Overall', formula: '70% highest individual risk + 30% average of all three' },
]

export function Methodology() {
  return (
    <section id="method" className="scroll-mt-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:py-20 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Explainable, not a black box</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Every score is derived from a published weighting you can inspect. Terrain and drainage factors amplify
            weather signals instead of creating risk on dry days. Bands: Low below 30, Moderate 30–54, High 55–74,
            Critical 75 and above.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Risk</th>
                <th scope="col" className="px-4 py-3 font-medium">Weighting</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.risk} className="border-t border-border">
                  <th scope="row" className="px-4 py-3 font-medium">{r.risk}</th>
                  <td className="px-4 py-3 text-muted-foreground">{r.formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
