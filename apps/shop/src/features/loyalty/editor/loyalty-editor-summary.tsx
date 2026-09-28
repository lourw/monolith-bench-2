import { NavigationTileGroup } from '../../../components/navigation/tile/navigation-tile-group';
import { buildLoyaltyEditorItems } from './loyalty-editor.model';
import { LOYALTY_EDITOR_FEATURE } from './loyalty-editor.routes';
import {
  pickLoyaltyEditorHighlights,
  totalLoyaltyEditor,
} from './loyalty-editor.utils';

export interface LoyaltyEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function LoyaltyEditorSummary({
  compact = false,
  limit = 3,
}: LoyaltyEditorSummaryProps) {
  const items = buildLoyaltyEditorItems();
  const totals = totalLoyaltyEditor(items);
  const highlights = pickLoyaltyEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${LOYALTY_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{LOYALTY_EDITOR_FEATURE.title}</h3>
      <NavigationTileGroup
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
