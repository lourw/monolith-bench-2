import { InputsPanelGroup } from '../../../components/inputs/panel/inputs-panel-group';
import { buildCartSummaryItems } from './cart-summary.model';
import { CART_SUMMARY_FEATURE } from './cart-summary.routes';
import {
  pickCartSummaryHighlights,
  totalCartSummary,
} from './cart-summary.utils';

export interface CartSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CartSummarySummary({
  compact = false,
  limit = 3,
}: CartSummarySummaryProps) {
  const items = buildCartSummaryItems();
  const totals = totalCartSummary(items);
  const highlights = pickCartSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CART_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CART_SUMMARY_FEATURE.title}</h3>
      <InputsPanelGroup
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
