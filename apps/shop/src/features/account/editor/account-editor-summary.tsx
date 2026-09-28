import { MediaToolbarGroup } from '../../../components/media/toolbar/media-toolbar-group';
import { buildAccountEditorItems } from './account-editor.model';
import { ACCOUNT_EDITOR_FEATURE } from './account-editor.routes';
import {
  pickAccountEditorHighlights,
  totalAccountEditor,
} from './account-editor.utils';

export interface AccountEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AccountEditorSummary({
  compact = false,
  limit = 3,
}: AccountEditorSummaryProps) {
  const items = buildAccountEditorItems();
  const totals = totalAccountEditor(items);
  const highlights = pickAccountEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ACCOUNT_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ACCOUNT_EDITOR_FEATURE.title}</h3>
      <MediaToolbarGroup
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
