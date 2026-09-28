import { OverlayStatGroup } from '../../../components/overlay/stat/overlay-stat-group';
import { buildReviewsEditorItems } from './reviews-editor.model';
import { REVIEWS_EDITOR_FEATURE } from './reviews-editor.routes';
import {
  pickReviewsEditorHighlights,
  totalReviewsEditor,
} from './reviews-editor.utils';

export interface ReviewsEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReviewsEditorSummary({
  compact = false,
  limit = 3,
}: ReviewsEditorSummaryProps) {
  const items = buildReviewsEditorItems();
  const totals = totalReviewsEditor(items);
  const highlights = pickReviewsEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${REVIEWS_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{REVIEWS_EDITOR_FEATURE.title}</h3>
      <OverlayStatGroup
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
