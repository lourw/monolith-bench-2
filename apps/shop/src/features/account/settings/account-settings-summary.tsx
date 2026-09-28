import { FeedbackChipGroup } from '../../../components/feedback/chip/feedback-chip-group';
import { buildAccountSettingsItems } from './account-settings.model';
import { ACCOUNT_SETTINGS_FEATURE } from './account-settings.routes';
import {
  pickAccountSettingsHighlights,
  totalAccountSettings,
} from './account-settings.utils';

export interface AccountSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AccountSettingsSummary({
  compact = false,
  limit = 3,
}: AccountSettingsSummaryProps) {
  const items = buildAccountSettingsItems();
  const totals = totalAccountSettings(items);
  const highlights = pickAccountSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ACCOUNT_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ACCOUNT_SETTINGS_FEATURE.title}
      </h3>
      <FeedbackChipGroup
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
