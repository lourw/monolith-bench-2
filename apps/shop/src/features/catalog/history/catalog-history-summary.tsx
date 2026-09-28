import { MarketingStatGroup } from '../../../components/marketing/stat/marketing-stat-group';
import { buildCatalogHistoryItems } from './catalog-history.model';
import { CATALOG_HISTORY_FEATURE } from './catalog-history.routes';
import {
  pickCatalogHistoryHighlights,
  totalCatalogHistory,
} from './catalog-history.utils';

export interface CatalogHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CatalogHistorySummary({
  compact = false,
  limit = 3,
}: CatalogHistorySummaryProps) {
  const items = buildCatalogHistoryItems();
  const totals = totalCatalogHistory(items);
  const highlights = pickCatalogHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CATALOG_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CATALOG_HISTORY_FEATURE.title}</h3>
      <MarketingStatGroup
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
