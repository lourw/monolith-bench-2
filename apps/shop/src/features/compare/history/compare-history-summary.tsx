import { FormsCardGroup } from '../../../components/forms/card/forms-card-group';
import { buildCompareHistoryItems } from './compare-history.model';
import { COMPARE_HISTORY_FEATURE } from './compare-history.routes';
import {
  pickCompareHistoryHighlights,
  totalCompareHistory,
} from './compare-history.utils';

export interface CompareHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CompareHistorySummary({
  compact = false,
  limit = 3,
}: CompareHistorySummaryProps) {
  const items = buildCompareHistoryItems();
  const totals = totalCompareHistory(items);
  const highlights = pickCompareHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${COMPARE_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{COMPARE_HISTORY_FEATURE.title}</h3>
      <FormsCardGroup
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
