import { TypographyBadgeGroup } from '../../../components/typography/badge/typography-badge-group';
import { buildCatalogInsightsItems } from './catalog-insights.model';
import { CATALOG_INSIGHTS_FEATURE } from './catalog-insights.routes';
import {
  pickCatalogInsightsHighlights,
  totalCatalogInsights,
} from './catalog-insights.utils';

export interface CatalogInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CatalogInsightsSummary({
  compact = false,
  limit = 3,
}: CatalogInsightsSummaryProps) {
  const items = buildCatalogInsightsItems();
  const totals = totalCatalogInsights(items);
  const highlights = pickCatalogInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CATALOG_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {CATALOG_INSIGHTS_FEATURE.title}
      </h3>
      <TypographyBadgeGroup
        size="sm"
        items={[
          { id: 'items', label: 'Items', value: items.length },
          { id: 'amount', label: 'Amount', value: totals.amount },
          { id: 'active', label: 'Active', value: totals.active },
          { id: 'pending', label: 'Pending', value: totals.pending },
        ]}
      />
      {!compact ? (
        <ol className="feature-summary-highlights">
          {highlights.map((item) => (
            <li key={item.id}>
              {item.name} — {item.amount}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
