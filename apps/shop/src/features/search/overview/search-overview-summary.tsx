import { DataPanelGroup } from '../../../components/data/panel/data-panel-group';
import { buildSearchOverviewItems } from './search-overview.model';
import { SEARCH_OVERVIEW_FEATURE } from './search-overview.routes';
import {
  pickSearchOverviewHighlights,
  totalSearchOverview,
} from './search-overview.utils';

export interface SearchOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SearchOverviewSummary({
  compact = false,
  limit = 3,
}: SearchOverviewSummaryProps) {
  const items = buildSearchOverviewItems();
  const totals = totalSearchOverview(items);
  const highlights = pickSearchOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SEARCH_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SEARCH_OVERVIEW_FEATURE.title}</h3>
      <DataPanelGroup
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
