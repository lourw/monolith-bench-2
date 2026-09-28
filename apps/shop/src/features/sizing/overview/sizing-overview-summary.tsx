import { FormsBadgeGroup } from '../../../components/forms/badge/forms-badge-group';
import { buildSizingOverviewItems } from './sizing-overview.model';
import { SIZING_OVERVIEW_FEATURE } from './sizing-overview.routes';
import {
  pickSizingOverviewHighlights,
  totalSizingOverview,
} from './sizing-overview.utils';

export interface SizingOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SizingOverviewSummary({
  compact = false,
  limit = 3,
}: SizingOverviewSummaryProps) {
  const items = buildSizingOverviewItems();
  const totals = totalSizingOverview(items);
  const highlights = pickSizingOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SIZING_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SIZING_OVERVIEW_FEATURE.title}</h3>
      <FormsBadgeGroup
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
