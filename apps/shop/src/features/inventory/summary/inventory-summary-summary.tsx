import { TypographyCardGroup } from '../../../components/typography/card/typography-card-group';
import { buildInventorySummaryItems } from './inventory-summary.model';
import { INVENTORY_SUMMARY_FEATURE } from './inventory-summary.routes';
import {
  pickInventorySummaryHighlights,
  totalInventorySummary,
} from './inventory-summary.utils';

export interface InventorySummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function InventorySummarySummary({
  compact = false,
  limit = 3,
}: InventorySummarySummaryProps) {
  const items = buildInventorySummaryItems();
  const totals = totalInventorySummary(items);
  const highlights = pickInventorySummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${INVENTORY_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {INVENTORY_SUMMARY_FEATURE.title}
      </h3>
      <TypographyCardGroup
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
