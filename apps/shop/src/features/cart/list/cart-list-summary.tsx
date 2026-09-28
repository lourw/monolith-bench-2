import { LayoutTileGroup } from '../../../components/layout/tile/layout-tile-group';
import { buildCartListItems } from './cart-list.model';
import { CART_LIST_FEATURE } from './cart-list.routes';
import { pickCartListHighlights, totalCartList } from './cart-list.utils';

export interface CartListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CartListSummary({
  compact = false,
  limit = 3,
}: CartListSummaryProps) {
  const items = buildCartListItems();
  const totals = totalCartList(items);
  const highlights = pickCartListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CART_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CART_LIST_FEATURE.title}</h3>
      <LayoutTileGroup
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
