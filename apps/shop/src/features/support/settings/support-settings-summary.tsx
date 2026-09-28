import { TypographyBadgeGroup } from '../../../components/typography/badge/typography-badge-group';
import { buildSupportSettingsItems } from './support-settings.model';
import { SUPPORT_SETTINGS_FEATURE } from './support-settings.routes';
import {
  pickSupportSettingsHighlights,
  totalSupportSettings,
} from './support-settings.utils';

export interface SupportSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SupportSettingsSummary({
  compact = false,
  limit = 3,
}: SupportSettingsSummaryProps) {
  const items = buildSupportSettingsItems();
  const totals = totalSupportSettings(items);
  const highlights = pickSupportSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUPPORT_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUPPORT_SETTINGS_FEATURE.title}
      </h3>
      <TypographyBadgeGroup
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
