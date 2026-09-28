import { TypographyStatGroup } from '../../../components/typography/stat/typography-stat-group';
import { buildPreordersEditorItems } from './preorders-editor.model';
import { PREORDERS_EDITOR_FEATURE } from './preorders-editor.routes';
import {
  pickPreordersEditorHighlights,
  totalPreordersEditor,
} from './preorders-editor.utils';

export interface PreordersEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PreordersEditorSummary({
  compact = false,
  limit = 3,
}: PreordersEditorSummaryProps) {
  const items = buildPreordersEditorItems();
  const totals = totalPreordersEditor(items);
  const highlights = pickPreordersEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PREORDERS_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PREORDERS_EDITOR_FEATURE.title}
      </h3>
      <TypographyStatGroup
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
