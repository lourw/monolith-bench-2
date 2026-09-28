import { CommerceHeaderGroup } from '../../../components/commerce/header/commerce-header-group';
import { buildAddressesSettingsItems } from './addresses-settings.model';
import { ADDRESSES_SETTINGS_FEATURE } from './addresses-settings.routes';
import {
  pickAddressesSettingsHighlights,
  totalAddressesSettings,
} from './addresses-settings.utils';

export interface AddressesSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AddressesSettingsSummary({
  compact = false,
  limit = 3,
}: AddressesSettingsSummaryProps) {
  const items = buildAddressesSettingsItems();
  const totals = totalAddressesSettings(items);
  const highlights = pickAddressesSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ADDRESSES_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ADDRESSES_SETTINGS_FEATURE.title}
      </h3>
      <CommerceHeaderGroup
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
