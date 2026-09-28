import { MarketingCardGroup } from '../../../components/marketing/card/marketing-card-group';
import { buildCatalogListItems } from './catalog-list.model';
import { CATALOG_LIST_FEATURE } from './catalog-list.routes';
import {
  pickCatalogListHighlights,
  totalCatalogList,
} from './catalog-list.utils';

export interface CatalogListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CatalogListSummary({
  compact = false,
  limit = 3,
}: CatalogListSummaryProps) {
  const items = buildCatalogListItems();
  const totals = totalCatalogList(items);
  const highlights = pickCatalogListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CATALOG_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CATALOG_LIST_FEATURE.title}</h3>
      <MarketingCardGroup
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
