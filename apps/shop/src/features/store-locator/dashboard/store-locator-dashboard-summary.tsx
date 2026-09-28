import { LayoutChipGroup } from '../../../components/layout/chip/layout-chip-group';
import { buildStoreLocatorDashboardItems } from './store-locator-dashboard.model';
import { STORE_LOCATOR_DASHBOARD_FEATURE } from './store-locator-dashboard.routes';
import {
  pickStoreLocatorDashboardHighlights,
  totalStoreLocatorDashboard,
} from './store-locator-dashboard.utils';

export interface StoreLocatorDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function StoreLocatorDashboardSummary({
  compact = false,
  limit = 3,
}: StoreLocatorDashboardSummaryProps) {
  const items = buildStoreLocatorDashboardItems();
  const totals = totalStoreLocatorDashboard(items);
  const highlights = pickStoreLocatorDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {STORE_LOCATOR_DASHBOARD_FEATURE.title}
      </h3>
      <LayoutChipGroup
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
