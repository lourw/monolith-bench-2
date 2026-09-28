import { MarketingBadgeGroup } from '../../../components/marketing/badge/marketing-badge-group';
import { buildAuthSettingsItems } from './auth-settings.model';
import { AUTH_SETTINGS_FEATURE } from './auth-settings.routes';
import {
  pickAuthSettingsHighlights,
  totalAuthSettings,
} from './auth-settings.utils';

export interface AuthSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AuthSettingsSummary({
  compact = false,
  limit = 3,
}: AuthSettingsSummaryProps) {
  const items = buildAuthSettingsItems();
  const totals = totalAuthSettings(items);
  const highlights = pickAuthSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${AUTH_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{AUTH_SETTINGS_FEATURE.title}</h3>
      <MarketingBadgeGroup
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
