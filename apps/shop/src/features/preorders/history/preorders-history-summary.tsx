import { MediaChipGroup } from '../../../components/media/chip/media-chip-group';
import { buildPreordersHistoryItems } from './preorders-history.model';
import { PREORDERS_HISTORY_FEATURE } from './preorders-history.routes';
import {
  pickPreordersHistoryHighlights,
  totalPreordersHistory,
} from './preorders-history.utils';

export interface PreordersHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PreordersHistorySummary({
  compact = false,
  limit = 3,
}: PreordersHistorySummaryProps) {
  const items = buildPreordersHistoryItems();
  const totals = totalPreordersHistory(items);
  const highlights = pickPreordersHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PREORDERS_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PREORDERS_HISTORY_FEATURE.title}
      </h3>
      <MediaChipGroup
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
