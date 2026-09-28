import { MarketingTileGroup } from '../../../components/marketing/tile/marketing-tile-group';
import { buildRecommendationsEditorItems } from './recommendations-editor.model';
import { RECOMMENDATIONS_EDITOR_FEATURE } from './recommendations-editor.routes';
import {
  pickRecommendationsEditorHighlights,
  totalRecommendationsEditor,
} from './recommendations-editor.utils';

export interface RecommendationsEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function RecommendationsEditorSummary({
  compact = false,
  limit = 3,
}: RecommendationsEditorSummaryProps) {
  const items = buildRecommendationsEditorItems();
  const totals = totalRecommendationsEditor(items);
  const highlights = pickRecommendationsEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {RECOMMENDATIONS_EDITOR_FEATURE.title}
      </h3>
      <MarketingTileGroup
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
