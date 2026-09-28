import { CorePanelGroup } from '../../../components/core/panel/core-panel-group';
import { buildWishlistEditorItems } from './wishlist-editor.model';
import { WISHLIST_EDITOR_FEATURE } from './wishlist-editor.routes';
import {
  pickWishlistEditorHighlights,
  totalWishlistEditor,
} from './wishlist-editor.utils';

export interface WishlistEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function WishlistEditorSummary({
  compact = false,
  limit = 3,
}: WishlistEditorSummaryProps) {
  const items = buildWishlistEditorItems();
  const totals = totalWishlistEditor(items);
  const highlights = pickWishlistEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${WISHLIST_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{WISHLIST_EDITOR_FEATURE.title}</h3>
      <CorePanelGroup
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
