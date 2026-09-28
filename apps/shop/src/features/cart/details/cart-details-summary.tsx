import { OverlayBadgeGroup } from '../../../components/overlay/badge/overlay-badge-group';
import { buildCartDetailsItems } from './cart-details.model';
import { CART_DETAILS_FEATURE } from './cart-details.routes';
import {
  pickCartDetailsHighlights,
  totalCartDetails,
} from './cart-details.utils';

export interface CartDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CartDetailsSummary({
  compact = false,
  limit = 3,
}: CartDetailsSummaryProps) {
  const items = buildCartDetailsItems();
  const totals = totalCartDetails(items);
  const highlights = pickCartDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CART_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CART_DETAILS_FEATURE.title}</h3>
      <OverlayBadgeGroup
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
