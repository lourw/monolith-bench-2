import { MediaCardGroup } from '../../../components/media/card/media-card-group';
import { buildPromotionsSettingsItems } from './promotions-settings.model';
import { PROMOTIONS_SETTINGS_FEATURE } from './promotions-settings.routes';
import {
  pickPromotionsSettingsHighlights,
  totalPromotionsSettings,
} from './promotions-settings.utils';

export interface PromotionsSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PromotionsSettingsSummary({
  compact = false,
  limit = 3,
}: PromotionsSettingsSummaryProps) {
  const items = buildPromotionsSettingsItems();
  const totals = totalPromotionsSettings(items);
  const highlights = pickPromotionsSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROMOTIONS_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PROMOTIONS_SETTINGS_FEATURE.title}
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
