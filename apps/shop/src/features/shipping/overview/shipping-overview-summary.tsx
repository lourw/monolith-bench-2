import { LayoutHeaderGroup } from '../../../components/layout/header/layout-header-group';
import { buildShippingOverviewItems } from './shipping-overview.model';
import { SHIPPING_OVERVIEW_FEATURE } from './shipping-overview.routes';
import {
  pickShippingOverviewHighlights,
  totalShippingOverview,
} from './shipping-overview.utils';

export interface ShippingOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ShippingOverviewSummary({
  compact = false,
  limit = 3,
}: ShippingOverviewSummaryProps) {
  const items = buildShippingOverviewItems();
  const totals = totalShippingOverview(items);
  const highlights = pickShippingOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SHIPPING_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SHIPPING_OVERVIEW_FEATURE.title}
      </h3>
      <LayoutHeaderGroup
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
