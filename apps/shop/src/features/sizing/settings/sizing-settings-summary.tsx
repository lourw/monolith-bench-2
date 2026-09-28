import { MediaBadgeGroup } from '../../../components/media/badge/media-badge-group';
import { buildSizingSettingsItems } from './sizing-settings.model';
import { SIZING_SETTINGS_FEATURE } from './sizing-settings.routes';
import {
  pickSizingSettingsHighlights,
  totalSizingSettings,
} from './sizing-settings.utils';

export interface SizingSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SizingSettingsSummary({
  compact = false,
  limit = 3,
}: SizingSettingsSummaryProps) {
  const items = buildSizingSettingsItems();
  const totals = totalSizingSettings(items);
  const highlights = pickSizingSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SIZING_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SIZING_SETTINGS_FEATURE.title}</h3>
      <MediaBadgeGroup
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
