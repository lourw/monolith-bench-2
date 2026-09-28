import { MediaTileGroup } from '../../../components/media/tile/media-tile-group';
import { buildInventoryDashboardItems } from './inventory-dashboard.model';
import { INVENTORY_DASHBOARD_FEATURE } from './inventory-dashboard.routes';
import {
  pickInventoryDashboardHighlights,
  totalInventoryDashboard,
} from './inventory-dashboard.utils';

export interface InventoryDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function InventoryDashboardSummary({
  compact = false,
  limit = 3,
}: InventoryDashboardSummaryProps) {
  const items = buildInventoryDashboardItems();
  const totals = totalInventoryDashboard(items);
  const highlights = pickInventoryDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${INVENTORY_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {INVENTORY_DASHBOARD_FEATURE.title}
      </h3>
      <MediaTileGroup
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
