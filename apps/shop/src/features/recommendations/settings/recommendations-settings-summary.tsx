import { TypographyBannerGroup } from '../../../components/typography/banner/typography-banner-group';
import { buildRecommendationsSettingsItems } from './recommendations-settings.model';
import { RECOMMENDATIONS_SETTINGS_FEATURE } from './recommendations-settings.routes';
import {
  pickRecommendationsSettingsHighlights,
  totalRecommendationsSettings,
} from './recommendations-settings.utils';

export interface RecommendationsSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function RecommendationsSettingsSummary({
  compact = false,
  limit = 3,
}: RecommendationsSettingsSummaryProps) {
  const items = buildRecommendationsSettingsItems();
  const totals = totalRecommendationsSettings(items);
  const highlights = pickRecommendationsSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {RECOMMENDATIONS_SETTINGS_FEATURE.title}
      </h3>
      <TypographyBannerGroup
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
