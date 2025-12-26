import { Header } from '../components/Header';
import { Article } from '../components/Article';
import { Footer } from '../components/Footer';


export function InequalityArticlePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <Article 
        articleId="inequality-article"
        title='Op-ed: What "Inequality" Really Means in America—and What Leaders Must Change'
        author="Contrarian Staff"
        credentials=""
        date="Dec 25, 2025"
        categories={['Culture', 'Commentary', 'Economics']}
        imageUrl="https://images.unsplash.com/photo-1761001315871-b1f7650a6303?w=1200&q=80"
        content={`"Inequality" has become the default explanation for nearly every difference in outcome in the United States. Housing costs rise, taxes vary, regions develop unevenly, wages diverge—and all of it is folded into a single word, as if every disparity must share a single cause. The prevailing assumption is simple: if outcomes don't line up neatly across groups, places, or industries, something must be wrong. Yet many of the disparities now described as inequality are not produced by markets at all. They are produced by regulation—and by policy choices that restrict opportunity rather than expand it.

A major source of confusion lies in how inequality is measured. Common metrics treat society as if there were a natural baseline of perfect equality—a hypothetical world in which individuals have identical incomes, identical preferences, identical constraints, and identical life choices. The distance between reality and that imagined baseline is then framed as evidence of injustice or systemic failure. But no free society has ever resembled that starting point. People differ in ambition, risk tolerance, family structure, educational paths, geographic preferences, and how they trade time for money. Variation is not a defect of freedom; it is a consequence of it.

As Friedrich Hayek observed, a free society "necessarily produces inequalities," because it allows individuals to act on different knowledge, preferences, and opportunities. Treating those differences as pathologies rather than signals confuses liberty with uniformity. When statistical tools are built around an imagined world of sameness, every real society will appear unequal—whether or not anything unjust has occurred.

The issue becomes far more serious when we fail to distinguish between disparities that arise from voluntary choices and those created by legal barriers. The most damaging forms of inequality in the United States today are not the result of markets operating freely; they are the result of markets being constrained.

Housing affordability is the clearest national example. In high-cost cities from San Francisco to New York to Boston, residents often blame developers, investors, or abstract economic forces for rising rents. Yet decades of research show that restrictive zoning—height caps, bans on multi-family housing, minimum lot sizes, parking mandates, and discretionary approval processes—plays a central role in driving prices upward. When governments limit how much housing can be built in places where people want to live, scarcity is not accidental. It is designed.

That scarcity raises prices. Those prices then appear in inequality statistics, which are cited as proof that markets have failed. But the causal chain runs in the opposite direction. The shortage is not a market outcome; it is the predictable result of policy choices that make adding supply illegal, slow, or financially risky.

The approval process itself compounds the problem nationwide. Projects that comply with written rules are routinely delayed or derailed by discretionary reviews, neighborhood opposition, or shifting standards. Time becomes a hidden tax. Developers respond rationally: they build fewer units, focus on high-end projects to offset risk, or abandon projects entirely. The resulting shortage is then blamed on capitalism, even though it is produced by administrative obstruction.

Tax policy often tells a similar story. Property tax systems across the country generate uneven burdens not because of natural market forces, but because assessment rules, zoning constraints, and land-use restrictions interact in ways that distort value. Properties may be taxed based on theoretical potential that zoning forbids, while others benefit from permissive rules that lower effective burdens. These disparities are recorded as inequality, but their source is institutional design.

The mistake is treating every measured disparity as evidence of injustice. Statistical tools do not ask whether a gap arose from voluntary exchange or from legal constraint; they simply register a difference. But when people cannot afford to live near work because housing supply is capped by law, that is not a natural inequality. When prices rise because land is artificially restricted from productive use, that is not a market failure. It is a policy outcome.

As Milton Friedman warned, many inequalities attributed to markets are "the result of government intervention rather than of the free market itself." Failing to distinguish between these sources leads policymakers to prescribe the wrong remedies—more regulation, more redistribution, more control—while leaving the root cause intact.

The United States does not need to eliminate differences in outcome to reduce hardship. It needs to distinguish between disparities that arise in a free society and disparities created by barriers to entry, mobility, and supply. Many of the most painful inequalities Americans experience—housing scarcity, high costs, regional stagnation—are not evidence of markets running unchecked. They are evidence of markets being tightly constrained.

The real crisis is not that outcomes differ. It is that policy increasingly treats any deviation from uniformity as a failure requiring correction, while ignoring the ways regulation itself creates artificial inequality. Chasing a mythical baseline of perfect equality obscures the more urgent task: removing the legal and administrative constraints that prevent opportunity from expanding.

If leaders want less hardship, they should stop asking why outcomes aren't identical—and start asking which rules are preventing people from building, moving, investing, and choosing freely in the first place.`}
      />

      <Footer />
    </div>
  );
}
