import { MarketingTileGroup } from '../../../components/marketing/tile/marketing-tile-group';
import { buildInventoryOverviewItems } from './inventory-overview.model';
import { INVENTORY_OVERVIEW_FEATURE } from './inventory-overview.routes';
import {
  pickInventoryOverviewHighlights,
  totalInventoryOverview,
} from './inventory-overview.utils';

export interface InventoryOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function InventoryOverviewSummary({
  compact = false,
  limit = 3,
}: InventoryOverviewSummaryProps) {
  const items = buildInventoryOverviewItems();
  const totals = totalInventoryOverview(items);
  const highlights = pickInventoryOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${INVENTORY_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {INVENTORY_OVERVIEW_FEATURE.title}
      </h3>
      <MarketingTileGroup
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
