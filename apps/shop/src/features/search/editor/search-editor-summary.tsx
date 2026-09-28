import { FormsCardGroup } from '../../../components/forms/card/forms-card-group';
import { buildSearchEditorItems } from './search-editor.model';
import { SEARCH_EDITOR_FEATURE } from './search-editor.routes';
import {
  pickSearchEditorHighlights,
  totalSearchEditor,
} from './search-editor.utils';

export interface SearchEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SearchEditorSummary({
  compact = false,
  limit = 3,
}: SearchEditorSummaryProps) {
  const items = buildSearchEditorItems();
  const totals = totalSearchEditor(items);
  const highlights = pickSearchEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SEARCH_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SEARCH_EDITOR_FEATURE.title}</h3>
      <FormsCardGroup
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
