import { InputsTileGroup } from '../../../components/inputs/tile/inputs-tile-group';
import { buildReviewsSettingsItems } from './reviews-settings.model';
import { REVIEWS_SETTINGS_FEATURE } from './reviews-settings.routes';
import {
  pickReviewsSettingsHighlights,
  totalReviewsSettings,
} from './reviews-settings.utils';

export interface ReviewsSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReviewsSettingsSummary({
  compact = false,
  limit = 3,
}: ReviewsSettingsSummaryProps) {
  const items = buildReviewsSettingsItems();
  const totals = totalReviewsSettings(items);
  const highlights = pickReviewsSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${REVIEWS_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {REVIEWS_SETTINGS_FEATURE.title}
      </h3>
      <InputsTileGroup
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
