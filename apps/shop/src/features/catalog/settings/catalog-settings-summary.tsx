import { CoreBadgeGroup } from '../../../components/core/badge/core-badge-group';
import { buildCatalogSettingsItems } from './catalog-settings.model';
import { CATALOG_SETTINGS_FEATURE } from './catalog-settings.routes';
import {
  pickCatalogSettingsHighlights,
  totalCatalogSettings,
} from './catalog-settings.utils';

export interface CatalogSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CatalogSettingsSummary({
  compact = false,
  limit = 3,
}: CatalogSettingsSummaryProps) {
  const items = buildCatalogSettingsItems();
  const totals = totalCatalogSettings(items);
  const highlights = pickCatalogSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CATALOG_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {CATALOG_SETTINGS_FEATURE.title}
      </h3>
      <CoreBadgeGroup
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
