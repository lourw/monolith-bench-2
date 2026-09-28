import { CoreToolbarGroup } from '../../../components/core/toolbar/core-toolbar-group';
import { buildFeedbackEditorItems } from './feedback-editor.model';
import { FEEDBACK_EDITOR_FEATURE } from './feedback-editor.routes';
import {
  pickFeedbackEditorHighlights,
  totalFeedbackEditor,
} from './feedback-editor.utils';

export interface FeedbackEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function FeedbackEditorSummary({
  compact = false,
  limit = 3,
}: FeedbackEditorSummaryProps) {
  const items = buildFeedbackEditorItems();
  const totals = totalFeedbackEditor(items);
  const highlights = pickFeedbackEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${FEEDBACK_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{FEEDBACK_EDITOR_FEATURE.title}</h3>
      <CoreToolbarGroup
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
