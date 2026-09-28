import { LayoutHeaderGroup } from '../../../components/layout/header/layout-header-group';
import { buildProfileSettingsItems } from './profile-settings.model';
import { PROFILE_SETTINGS_FEATURE } from './profile-settings.routes';
import {
  pickProfileSettingsHighlights,
  totalProfileSettings,
} from './profile-settings.utils';

export interface ProfileSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ProfileSettingsSummary({
  compact = false,
  limit = 3,
}: ProfileSettingsSummaryProps) {
  const items = buildProfileSettingsItems();
  const totals = totalProfileSettings(items);
  const highlights = pickProfileSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROFILE_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PROFILE_SETTINGS_FEATURE.title}
      </h3>
      <LayoutHeaderGroup
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
