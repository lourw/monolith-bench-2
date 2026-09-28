import { DataStatGroup } from '../../../components/data/stat/data-stat-group';
import { buildSizingEditorItems } from './sizing-editor.model';
import { SIZING_EDITOR_FEATURE } from './sizing-editor.routes';
import {
  pickSizingEditorHighlights,
  totalSizingEditor,
} from './sizing-editor.utils';

export interface SizingEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SizingEditorSummary({
  compact = false,
  limit = 3,
}: SizingEditorSummaryProps) {
  const items = buildSizingEditorItems();
  const totals = totalSizingEditor(items);
  const highlights = pickSizingEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SIZING_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SIZING_EDITOR_FEATURE.title}</h3>
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
