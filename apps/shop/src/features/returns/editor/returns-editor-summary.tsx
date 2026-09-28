import { OverlayListGroup } from '../../../components/overlay/list/overlay-list-group';
import { buildReturnsEditorItems } from './returns-editor.model';
import { RETURNS_EDITOR_FEATURE } from './returns-editor.routes';
import {
  pickReturnsEditorHighlights,
  totalReturnsEditor,
} from './returns-editor.utils';

export interface ReturnsEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReturnsEditorSummary({
  compact = false,
  limit = 3,
}: ReturnsEditorSummaryProps) {
  const items = buildReturnsEditorItems();
  const totals = totalReturnsEditor(items);
  const highlights = pickReturnsEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RETURNS_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{RETURNS_EDITOR_FEATURE.title}</h3>
      <OverlayListGroup
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
