import { FeedbackCardGroup } from '../../../components/feedback/card/feedback-card-group';
import { buildCartSettingsItems } from './cart-settings.model';
import { CART_SETTINGS_FEATURE } from './cart-settings.routes';
import {
  pickCartSettingsHighlights,
  totalCartSettings,
} from './cart-settings.utils';

export interface CartSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CartSettingsSummary({
  compact = false,
  limit = 3,
}: CartSettingsSummaryProps) {
  const items = buildCartSettingsItems();
  const totals = totalCartSettings(items);
  const highlights = pickCartSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CART_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CART_SETTINGS_FEATURE.title}</h3>
      <FeedbackCardGroup
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
