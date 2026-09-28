import { TypographyHeaderGroup } from '../../../components/typography/header/typography-header-group';
import { buildSubscriptionsEditorItems } from './subscriptions-editor.model';
import { SUBSCRIPTIONS_EDITOR_FEATURE } from './subscriptions-editor.routes';
import {
  pickSubscriptionsEditorHighlights,
  totalSubscriptionsEditor,
} from './subscriptions-editor.utils';

export interface SubscriptionsEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SubscriptionsEditorSummary({
  compact = false,
  limit = 3,
}: SubscriptionsEditorSummaryProps) {
  const items = buildSubscriptionsEditorItems();
  const totals = totalSubscriptionsEditor(items);
  const highlights = pickSubscriptionsEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUBSCRIPTIONS_EDITOR_FEATURE.title}
      </h3>
      <TypographyHeaderGroup
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
