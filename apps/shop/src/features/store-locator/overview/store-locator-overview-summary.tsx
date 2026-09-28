import { FormsTileGroup } from '../../../components/forms/tile/forms-tile-group';
import { buildStoreLocatorOverviewItems } from './store-locator-overview.model';
import { STORE_LOCATOR_OVERVIEW_FEATURE } from './store-locator-overview.routes';
import {
  pickStoreLocatorOverviewHighlights,
  totalStoreLocatorOverview,
} from './store-locator-overview.utils';

export interface StoreLocatorOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function StoreLocatorOverviewSummary({
  compact = false,
  limit = 3,
}: StoreLocatorOverviewSummaryProps) {
  const items = buildStoreLocatorOverviewItems();
  const totals = totalStoreLocatorOverview(items);
  const highlights = pickStoreLocatorOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {STORE_LOCATOR_OVERVIEW_FEATURE.title}
      </h3>
      <FormsTileGroup
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
