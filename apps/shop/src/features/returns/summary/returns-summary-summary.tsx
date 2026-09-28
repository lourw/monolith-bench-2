import { ChartsListGroup } from '../../../components/charts/list/charts-list-group';
import { buildReturnsSummaryItems } from './returns-summary.model';
import { RETURNS_SUMMARY_FEATURE } from './returns-summary.routes';
import {
  pickReturnsSummaryHighlights,
  totalReturnsSummary,
} from './returns-summary.utils';

export interface ReturnsSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReturnsSummarySummary({
  compact = false,
  limit = 3,
}: ReturnsSummarySummaryProps) {
  const items = buildReturnsSummaryItems();
  const totals = totalReturnsSummary(items);
  const highlights = pickReturnsSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RETURNS_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{RETURNS_SUMMARY_FEATURE.title}</h3>
      <ChartsListGroup
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
