import { FormsBannerGroup } from '../../../components/forms/banner/forms-banner-group';
import { buildPreordersSettingsItems } from './preorders-settings.model';
import { PREORDERS_SETTINGS_FEATURE } from './preorders-settings.routes';
import {
  pickPreordersSettingsHighlights,
  totalPreordersSettings,
} from './preorders-settings.utils';

export interface PreordersSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PreordersSettingsSummary({
  compact = false,
  limit = 3,
}: PreordersSettingsSummaryProps) {
  const items = buildPreordersSettingsItems();
  const totals = totalPreordersSettings(items);
  const highlights = pickPreordersSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PREORDERS_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PREORDERS_SETTINGS_FEATURE.title}
      </h3>
      <FormsBannerGroup
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
