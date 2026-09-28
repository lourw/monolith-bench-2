import { CoreTileGroup } from '../../../components/core/tile/core-tile-group';
import { buildStoreLocatorListItems } from './store-locator-list.model';
import { STORE_LOCATOR_LIST_FEATURE } from './store-locator-list.routes';
import {
  pickStoreLocatorListHighlights,
  totalStoreLocatorList,
} from './store-locator-list.utils';

export interface StoreLocatorListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function StoreLocatorListSummary({
  compact = false,
  limit = 3,
}: StoreLocatorListSummaryProps) {
  const items = buildStoreLocatorListItems();
  const totals = totalStoreLocatorList(items);
  const highlights = pickStoreLocatorListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${STORE_LOCATOR_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {STORE_LOCATOR_LIST_FEATURE.title}
      </h3>
      <CoreTileGroup
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
