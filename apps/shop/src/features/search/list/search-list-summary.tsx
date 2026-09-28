import { MarketingBannerGroup } from '../../../components/marketing/banner/marketing-banner-group';
import { buildSearchListItems } from './search-list.model';
import { SEARCH_LIST_FEATURE } from './search-list.routes';
import { pickSearchListHighlights, totalSearchList } from './search-list.utils';

export interface SearchListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SearchListSummary({
  compact = false,
  limit = 3,
}: SearchListSummaryProps) {
  const items = buildSearchListItems();
  const totals = totalSearchList(items);
  const highlights = pickSearchListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SEARCH_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SEARCH_LIST_FEATURE.title}</h3>
      <MarketingBannerGroup
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
