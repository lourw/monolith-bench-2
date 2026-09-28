import { MediaCardGroup } from '../../../components/media/card/media-card-group';
import { buildStoreLocatorSettingsItems } from './store-locator-settings.model';
import { STORE_LOCATOR_SETTINGS_FEATURE } from './store-locator-settings.routes';
import {
  pickStoreLocatorSettingsHighlights,
  totalStoreLocatorSettings,
} from './store-locator-settings.utils';

export interface StoreLocatorSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function StoreLocatorSettingsSummary({
  compact = false,
  limit = 3,
}: StoreLocatorSettingsSummaryProps) {
  const items = buildStoreLocatorSettingsItems();
  const totals = totalStoreLocatorSettings(items);
  const highlights = pickStoreLocatorSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${STORE_LOCATOR_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {STORE_LOCATOR_SETTINGS_FEATURE.title}
      </h3>
      <MediaCardGroup
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
