import { DataStatGroup } from '../../../components/data/stat/data-stat-group';
import { buildTrackingEditorItems } from './tracking-editor.model';
import { TRACKING_EDITOR_FEATURE } from './tracking-editor.routes';
import {
  pickTrackingEditorHighlights,
  totalTrackingEditor,
} from './tracking-editor.utils';

export interface TrackingEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function TrackingEditorSummary({
  compact = false,
  limit = 3,
}: TrackingEditorSummaryProps) {
  const items = buildTrackingEditorItems();
  const totals = totalTrackingEditor(items);
  const highlights = pickTrackingEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${TRACKING_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{TRACKING_EDITOR_FEATURE.title}</h3>
      <DataStatGroup
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
