import { CommerceListGroup } from '../../../components/commerce/list/commerce-list-group';
import { buildBundlesSettingsItems } from './bundles-settings.model';
import { BUNDLES_SETTINGS_FEATURE } from './bundles-settings.routes';
import {
  pickBundlesSettingsHighlights,
  totalBundlesSettings,
} from './bundles-settings.utils';

export interface BundlesSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function BundlesSettingsSummary({
  compact = false,
  limit = 3,
}: BundlesSettingsSummaryProps) {
  const items = buildBundlesSettingsItems();
  const totals = totalBundlesSettings(items);
  const highlights = pickBundlesSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${BUNDLES_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {BUNDLES_SETTINGS_FEATURE.title}
      </h3>
      <CommerceListGroup
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
