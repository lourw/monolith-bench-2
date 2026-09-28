import { LayoutChipGroup } from '../../../components/layout/chip/layout-chip-group';
import { buildCartOverviewItems } from './cart-overview.model';
import { CART_OVERVIEW_FEATURE } from './cart-overview.routes';
import {
  pickCartOverviewHighlights,
  totalCartOverview,
} from './cart-overview.utils';

export interface CartOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CartOverviewSummary({
  compact = false,
  limit = 3,
}: CartOverviewSummaryProps) {
  const items = buildCartOverviewItems();
  const totals = totalCartOverview(items);
  const highlights = pickCartOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CART_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CART_OVERVIEW_FEATURE.title}</h3>
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
