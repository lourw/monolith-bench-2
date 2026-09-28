import { CommerceStatGroup } from '../../../components/commerce/stat/commerce-stat-group';
import { buildGiftCardsEditorItems } from './gift-cards-editor.model';
import { GIFT_CARDS_EDITOR_FEATURE } from './gift-cards-editor.routes';
import {
  pickGiftCardsEditorHighlights,
  totalGiftCardsEditor,
} from './gift-cards-editor.utils';

export interface GiftCardsEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function GiftCardsEditorSummary({
  compact = false,
  limit = 3,
}: GiftCardsEditorSummaryProps) {
  const items = buildGiftCardsEditorItems();
  const totals = totalGiftCardsEditor(items);
  const highlights = pickGiftCardsEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${GIFT_CARDS_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {GIFT_CARDS_EDITOR_FEATURE.title}
      </h3>
      <CommerceStatGroup
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
