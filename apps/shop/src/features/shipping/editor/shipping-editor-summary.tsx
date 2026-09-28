import { FeedbackTileGroup } from '../../../components/feedback/tile/feedback-tile-group';
import { buildShippingEditorItems } from './shipping-editor.model';
import { SHIPPING_EDITOR_FEATURE } from './shipping-editor.routes';
import {
  pickShippingEditorHighlights,
  totalShippingEditor,
} from './shipping-editor.utils';

export interface ShippingEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ShippingEditorSummary({
  compact = false,
  limit = 3,
}: ShippingEditorSummaryProps) {
  const items = buildShippingEditorItems();
  const totals = totalShippingEditor(items);
  const highlights = pickShippingEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SHIPPING_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SHIPPING_EDITOR_FEATURE.title}</h3>
      <FeedbackTileGroup
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
