import { FeedbackPanelGroup } from '../../../components/feedback/panel/feedback-panel-group';
import { buildAnalyticsEditorItems } from './analytics-editor.model';
import { ANALYTICS_EDITOR_FEATURE } from './analytics-editor.routes';
import {
  pickAnalyticsEditorHighlights,
  totalAnalyticsEditor,
} from './analytics-editor.utils';

export interface AnalyticsEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AnalyticsEditorSummary({
  compact = false,
  limit = 3,
}: AnalyticsEditorSummaryProps) {
  const items = buildAnalyticsEditorItems();
  const totals = totalAnalyticsEditor(items);
  const highlights = pickAnalyticsEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ANALYTICS_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ANALYTICS_EDITOR_FEATURE.title}
      </h3>
      <FeedbackPanelGroup
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
