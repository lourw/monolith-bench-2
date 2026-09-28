import { TypographyTileGroup } from '../../../components/typography/tile/typography-tile-group';
import { buildSubscriptionsSettingsItems } from './subscriptions-settings.model';
import { SUBSCRIPTIONS_SETTINGS_FEATURE } from './subscriptions-settings.routes';
import {
  pickSubscriptionsSettingsHighlights,
  totalSubscriptionsSettings,
} from './subscriptions-settings.utils';

export interface SubscriptionsSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SubscriptionsSettingsSummary({
  compact = false,
  limit = 3,
}: SubscriptionsSettingsSummaryProps) {
  const items = buildSubscriptionsSettingsItems();
  const totals = totalSubscriptionsSettings(items);
  const highlights = pickSubscriptionsSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUBSCRIPTIONS_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUBSCRIPTIONS_SETTINGS_FEATURE.title}
      </h3>
      <TypographyTileGroup
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
