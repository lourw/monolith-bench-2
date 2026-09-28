import { NavigationBadgeGroup } from '../../../components/navigation/badge/navigation-badge-group';
import { buildFeedbackSettingsItems } from './feedback-settings.model';
import { FEEDBACK_SETTINGS_FEATURE } from './feedback-settings.routes';
import {
  pickFeedbackSettingsHighlights,
  totalFeedbackSettings,
} from './feedback-settings.utils';

export interface FeedbackSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function FeedbackSettingsSummary({
  compact = false,
  limit = 3,
}: FeedbackSettingsSummaryProps) {
  const items = buildFeedbackSettingsItems();
  const totals = totalFeedbackSettings(items);
  const highlights = pickFeedbackSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${FEEDBACK_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {FEEDBACK_SETTINGS_FEATURE.title}
      </h3>
      <NavigationBadgeGroup
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
