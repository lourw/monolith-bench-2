import { NavigationListGroup } from '../../../components/navigation/list/navigation-list-group';
import { buildCompareSummaryItems } from './compare-summary.model';
import { COMPARE_SUMMARY_FEATURE } from './compare-summary.routes';
import {
  pickCompareSummaryHighlights,
  totalCompareSummary,
} from './compare-summary.utils';

export interface CompareSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CompareSummarySummary({
  compact = false,
  limit = 3,
}: CompareSummarySummaryProps) {
  const items = buildCompareSummaryItems();
  const totals = totalCompareSummary(items);
  const highlights = pickCompareSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${COMPARE_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{COMPARE_SUMMARY_FEATURE.title}</h3>
      <NavigationListGroup
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
