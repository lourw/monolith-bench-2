import { ChartsChipGroup } from '../../../components/charts/chip/charts-chip-group';
import { buildStoreLocatorEditorItems } from './store-locator-editor.model';
import { STORE_LOCATOR_EDITOR_FEATURE } from './store-locator-editor.routes';
import {
  pickStoreLocatorEditorHighlights,
  totalStoreLocatorEditor,
} from './store-locator-editor.utils';

export interface StoreLocatorEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function StoreLocatorEditorSummary({
  compact = false,
  limit = 3,
}: StoreLocatorEditorSummaryProps) {
  const items = buildStoreLocatorEditorItems();
  const totals = totalStoreLocatorEditor(items);
  const highlights = pickStoreLocatorEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${STORE_LOCATOR_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {STORE_LOCATOR_EDITOR_FEATURE.title}
      </h3>
      <ChartsChipGroup
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
