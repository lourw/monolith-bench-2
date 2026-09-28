import { CoreCardGroup } from '../../../components/core/card/core-card-group';
import { buildSizingListItems } from './sizing-list.model';
import { SIZING_LIST_FEATURE } from './sizing-list.routes';
import { pickSizingListHighlights, totalSizingList } from './sizing-list.utils';

export interface SizingListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SizingListSummary({
  compact = false,
  limit = 3,
}: SizingListSummaryProps) {
  const items = buildSizingListItems();
  const totals = totalSizingList(items);
  const highlights = pickSizingListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SIZING_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SIZING_LIST_FEATURE.title}</h3>
      <CoreCardGroup
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
