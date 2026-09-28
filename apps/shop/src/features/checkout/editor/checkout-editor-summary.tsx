import { DataHeaderGroup } from '../../../components/data/header/data-header-group';
import { buildCheckoutEditorItems } from './checkout-editor.model';
import { CHECKOUT_EDITOR_FEATURE } from './checkout-editor.routes';
import {
  pickCheckoutEditorHighlights,
  totalCheckoutEditor,
} from './checkout-editor.utils';

export interface CheckoutEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CheckoutEditorSummary({
  compact = false,
  limit = 3,
}: CheckoutEditorSummaryProps) {
  const items = buildCheckoutEditorItems();
  const totals = totalCheckoutEditor(items);
  const highlights = pickCheckoutEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CHECKOUT_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CHECKOUT_EDITOR_FEATURE.title}</h3>
      <DataHeaderGroup
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
