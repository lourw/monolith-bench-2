import { ChartsPanelGroup } from '../../../components/charts/panel/charts-panel-group';
import { buildPromotionsEditorItems } from './promotions-editor.model';
import { PROMOTIONS_EDITOR_FEATURE } from './promotions-editor.routes';
import {
  pickPromotionsEditorHighlights,
  totalPromotionsEditor,
} from './promotions-editor.utils';

export interface PromotionsEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PromotionsEditorSummary({
  compact = false,
  limit = 3,
}: PromotionsEditorSummaryProps) {
  const items = buildPromotionsEditorItems();
  const totals = totalPromotionsEditor(items);
  const highlights = pickPromotionsEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROMOTIONS_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PROMOTIONS_EDITOR_FEATURE.title}
      </h3>
      <ChartsPanelGroup
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
