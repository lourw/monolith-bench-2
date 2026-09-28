import { ChartsCardGroup } from '../../../components/charts/card/charts-card-group';
import { buildSupportEditorItems } from './support-editor.model';
import { SUPPORT_EDITOR_FEATURE } from './support-editor.routes';
import {
  pickSupportEditorHighlights,
  totalSupportEditor,
} from './support-editor.utils';

export interface SupportEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SupportEditorSummary({
  compact = false,
  limit = 3,
}: SupportEditorSummaryProps) {
  const items = buildSupportEditorItems();
  const totals = totalSupportEditor(items);
  const highlights = pickSupportEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUPPORT_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SUPPORT_EDITOR_FEATURE.title}</h3>
      <ChartsCardGroup
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
