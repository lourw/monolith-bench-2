import { CommercePanelGroup } from '../../../components/commerce/panel/commerce-panel-group';
import { buildCatalogDetailsItems } from './catalog-details.model';
import { CATALOG_DETAILS_FEATURE } from './catalog-details.routes';
import {
  pickCatalogDetailsHighlights,
  totalCatalogDetails,
} from './catalog-details.utils';

export interface CatalogDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CatalogDetailsSummary({
  compact = false,
  limit = 3,
}: CatalogDetailsSummaryProps) {
  const items = buildCatalogDetailsItems();
  const totals = totalCatalogDetails(items);
  const highlights = pickCatalogDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CATALOG_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CATALOG_DETAILS_FEATURE.title}</h3>
      <CommercePanelGroup
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
