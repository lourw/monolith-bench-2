import { DataBannerGroup } from '../../../components/data/banner/data-banner-group';
import { buildSearchHistoryItems } from './search-history.model';
import { SEARCH_HISTORY_FEATURE } from './search-history.routes';
import {
  pickSearchHistoryHighlights,
  totalSearchHistory,
} from './search-history.utils';

export interface SearchHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SearchHistorySummary({
  compact = false,
  limit = 3,
}: SearchHistorySummaryProps) {
  const items = buildSearchHistoryItems();
  const totals = totalSearchHistory(items);
  const highlights = pickSearchHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SEARCH_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SEARCH_HISTORY_FEATURE.title}</h3>
      <DataBannerGroup
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
