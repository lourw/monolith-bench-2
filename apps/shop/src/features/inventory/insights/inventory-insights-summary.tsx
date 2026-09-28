import { TypographyHeaderGroup } from '../../../components/typography/header/typography-header-group';
import { buildInventoryInsightsItems } from './inventory-insights.model';
import { INVENTORY_INSIGHTS_FEATURE } from './inventory-insights.routes';
import {
  pickInventoryInsightsHighlights,
  totalInventoryInsights,
} from './inventory-insights.utils';

export interface InventoryInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function InventoryInsightsSummary({
  compact = false,
  limit = 3,
}: InventoryInsightsSummaryProps) {
  const items = buildInventoryInsightsItems();
  const totals = totalInventoryInsights(items);
  const highlights = pickInventoryInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${INVENTORY_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {INVENTORY_INSIGHTS_FEATURE.title}
      </h3>
      <TypographyHeaderGroup
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
