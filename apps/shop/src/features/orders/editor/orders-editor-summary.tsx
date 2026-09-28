import { CoreTileGroup } from '../../../components/core/tile/core-tile-group';
import { buildOrdersEditorItems } from './orders-editor.model';
import { ORDERS_EDITOR_FEATURE } from './orders-editor.routes';
import {
  pickOrdersEditorHighlights,
  totalOrdersEditor,
} from './orders-editor.utils';

export interface OrdersEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function OrdersEditorSummary({
  compact = false,
  limit = 3,
}: OrdersEditorSummaryProps) {
  const items = buildOrdersEditorItems();
  const totals = totalOrdersEditor(items);
  const highlights = pickOrdersEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ORDERS_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ORDERS_EDITOR_FEATURE.title}</h3>
      <CoreTileGroup
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
