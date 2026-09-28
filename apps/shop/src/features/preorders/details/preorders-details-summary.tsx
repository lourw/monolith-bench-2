import { DataCardGroup } from '../../../components/data/card/data-card-group';
import { buildPreordersDetailsItems } from './preorders-details.model';
import { PREORDERS_DETAILS_FEATURE } from './preorders-details.routes';
import {
  pickPreordersDetailsHighlights,
  totalPreordersDetails,
} from './preorders-details.utils';

export interface PreordersDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PreordersDetailsSummary({
  compact = false,
  limit = 3,
}: PreordersDetailsSummaryProps) {
  const items = buildPreordersDetailsItems();
  const totals = totalPreordersDetails(items);
  const highlights = pickPreordersDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PREORDERS_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PREORDERS_DETAILS_FEATURE.title}
      </h3>
      <DataCardGroup
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
