import { TypographyToolbarGroup } from '../../../components/typography/toolbar/typography-toolbar-group';
import { buildInventoryEditorItems } from './inventory-editor.model';
import { INVENTORY_EDITOR_FEATURE } from './inventory-editor.routes';
import {
  pickInventoryEditorHighlights,
  totalInventoryEditor,
} from './inventory-editor.utils';

export interface InventoryEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function InventoryEditorSummary({
  compact = false,
  limit = 3,
}: InventoryEditorSummaryProps) {
  const items = buildInventoryEditorItems();
  const totals = totalInventoryEditor(items);
  const highlights = pickInventoryEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${INVENTORY_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {INVENTORY_EDITOR_FEATURE.title}
      </h3>
      <TypographyToolbarGroup
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
