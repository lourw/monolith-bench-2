import { CommerceStatGroup } from '../../../components/commerce/stat/commerce-stat-group';
import { buildWishlistSettingsItems } from './wishlist-settings.model';
import { WISHLIST_SETTINGS_FEATURE } from './wishlist-settings.routes';
import {
  pickWishlistSettingsHighlights,
  totalWishlistSettings,
} from './wishlist-settings.utils';

export interface WishlistSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function WishlistSettingsSummary({
  compact = false,
  limit = 3,
}: WishlistSettingsSummaryProps) {
  const items = buildWishlistSettingsItems();
  const totals = totalWishlistSettings(items);
  const highlights = pickWishlistSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${WISHLIST_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {WISHLIST_SETTINGS_FEATURE.title}
      </h3>
      <CommerceStatGroup
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
