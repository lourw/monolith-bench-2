import { FeedbackListGroup } from '../../../components/feedback/list/feedback-list-group';
import { buildTrackingSettingsItems } from './tracking-settings.model';
import { TRACKING_SETTINGS_FEATURE } from './tracking-settings.routes';
import {
  pickTrackingSettingsHighlights,
  totalTrackingSettings,
} from './tracking-settings.utils';

export interface TrackingSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function TrackingSettingsSummary({
  compact = false,
  limit = 3,
}: TrackingSettingsSummaryProps) {
  const items = buildTrackingSettingsItems();
  const totals = totalTrackingSettings(items);
  const highlights = pickTrackingSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${TRACKING_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {TRACKING_SETTINGS_FEATURE.title}
      </h3>
      <FeedbackListGroup
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
