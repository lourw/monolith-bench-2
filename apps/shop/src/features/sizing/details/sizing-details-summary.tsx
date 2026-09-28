import { FormsBadgeGroup } from '../../../components/forms/badge/forms-badge-group';
import { buildSizingDetailsItems } from './sizing-details.model';
import { SIZING_DETAILS_FEATURE } from './sizing-details.routes';
import {
  pickSizingDetailsHighlights,
  totalSizingDetails,
} from './sizing-details.utils';

export interface SizingDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SizingDetailsSummary({
  compact = false,
  limit = 3,
}: SizingDetailsSummaryProps) {
  const items = buildSizingDetailsItems();
  const totals = totalSizingDetails(items);
  const highlights = pickSizingDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SIZING_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SIZING_DETAILS_FEATURE.title}</h3>
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
