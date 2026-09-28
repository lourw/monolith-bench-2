import { CoreHeaderGroup } from '../../../components/core/header/core-header-group';
import { buildAnalyticsSettingsItems } from './analytics-settings.model';
import { ANALYTICS_SETTINGS_FEATURE } from './analytics-settings.routes';
import {
  pickAnalyticsSettingsHighlights,
  totalAnalyticsSettings,
} from './analytics-settings.utils';

export interface AnalyticsSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AnalyticsSettingsSummary({
  compact = false,
  limit = 3,
}: AnalyticsSettingsSummaryProps) {
  const items = buildAnalyticsSettingsItems();
  const totals = totalAnalyticsSettings(items);
  const highlights = pickAnalyticsSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ANALYTICS_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ANALYTICS_SETTINGS_FEATURE.title}
      </h3>
      <CoreHeaderGroup
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
