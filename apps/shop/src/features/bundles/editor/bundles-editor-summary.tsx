import { LayoutCardGroup } from '../../../components/layout/card/layout-card-group';
import { buildBundlesEditorItems } from './bundles-editor.model';
import { BUNDLES_EDITOR_FEATURE } from './bundles-editor.routes';
import {
  pickBundlesEditorHighlights,
  totalBundlesEditor,
} from './bundles-editor.utils';

export interface BundlesEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function BundlesEditorSummary({
  compact = false,
  limit = 3,
}: BundlesEditorSummaryProps) {
  const items = buildBundlesEditorItems();
  const totals = totalBundlesEditor(items);
  const highlights = pickBundlesEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${BUNDLES_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{BUNDLES_EDITOR_FEATURE.title}</h3>
      <LayoutCardGroup
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
