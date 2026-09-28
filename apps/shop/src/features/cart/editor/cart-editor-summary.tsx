import { CoreHeaderGroup } from '../../../components/core/header/core-header-group';
import { buildCartEditorItems } from './cart-editor.model';
import { CART_EDITOR_FEATURE } from './cart-editor.routes';
import { pickCartEditorHighlights, totalCartEditor } from './cart-editor.utils';

export interface CartEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CartEditorSummary({
  compact = false,
  limit = 3,
}: CartEditorSummaryProps) {
  const items = buildCartEditorItems();
  const totals = totalCartEditor(items);
  const highlights = pickCartEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CART_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CART_EDITOR_FEATURE.title}</h3>
      <CoreHeaderGroup
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
