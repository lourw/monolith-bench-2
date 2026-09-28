import { TypographyPanelGroup } from '../../../components/typography/panel/typography-panel-group';
import { buildGiftCardsSettingsItems } from './gift-cards-settings.model';
import { GIFT_CARDS_SETTINGS_FEATURE } from './gift-cards-settings.routes';
import {
  pickGiftCardsSettingsHighlights,
  totalGiftCardsSettings,
} from './gift-cards-settings.utils';

export interface GiftCardsSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function GiftCardsSettingsSummary({
  compact = false,
  limit = 3,
}: GiftCardsSettingsSummaryProps) {
  const items = buildGiftCardsSettingsItems();
  const totals = totalGiftCardsSettings(items);
  const highlights = pickGiftCardsSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${GIFT_CARDS_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {GIFT_CARDS_SETTINGS_FEATURE.title}
      </h3>
      <TypographyPanelGroup
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
