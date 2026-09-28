import { CommerceTileGroup } from '../../../components/commerce/tile/commerce-tile-group';
import { buildCatalogSummaryItems } from './catalog-summary.model';
import { CATALOG_SUMMARY_FEATURE } from './catalog-summary.routes';
import {
  pickCatalogSummaryHighlights,
  totalCatalogSummary,
} from './catalog-summary.utils';

export interface CatalogSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CatalogSummarySummary({
  compact = false,
  limit = 3,
}: CatalogSummarySummaryProps) {
  const items = buildCatalogSummaryItems();
  const totals = totalCatalogSummary(items);
  const highlights = pickCatalogSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CATALOG_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CATALOG_SUMMARY_FEATURE.title}</h3>
      <CommerceTileGroup
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
