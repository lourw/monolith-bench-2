import { MarketingListGroup } from '../../../components/marketing/list/marketing-list-group';
import { buildSearchSummaryItems } from './search-summary.model';
import { SEARCH_SUMMARY_FEATURE } from './search-summary.routes';
import {
  pickSearchSummaryHighlights,
  totalSearchSummary,
} from './search-summary.utils';

export interface SearchSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SearchSummarySummary({
  compact = false,
  limit = 3,
}: SearchSummarySummaryProps) {
  const items = buildSearchSummaryItems();
  const totals = totalSearchSummary(items);
  const highlights = pickSearchSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SEARCH_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SEARCH_SUMMARY_FEATURE.title}</h3>
      <MarketingListGroup
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
