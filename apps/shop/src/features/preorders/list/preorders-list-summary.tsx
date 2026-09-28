import { FeedbackTileGroup } from '../../../components/feedback/tile/feedback-tile-group';
import { buildPreordersListItems } from './preorders-list.model';
import { PREORDERS_LIST_FEATURE } from './preorders-list.routes';
import {
  pickPreordersListHighlights,
  totalPreordersList,
} from './preorders-list.utils';

export interface PreordersListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PreordersListSummary({
  compact = false,
  limit = 3,
}: PreordersListSummaryProps) {
  const items = buildPreordersListItems();
  const totals = totalPreordersList(items);
  const highlights = pickPreordersListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PREORDERS_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{PREORDERS_LIST_FEATURE.title}</h3>
      <FeedbackTileGroup
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
