import { FeedbackHeaderGroup } from '../../../components/feedback/header/feedback-header-group';
import { buildReturnsSettingsItems } from './returns-settings.model';
import { RETURNS_SETTINGS_FEATURE } from './returns-settings.routes';
import {
  pickReturnsSettingsHighlights,
  totalReturnsSettings,
} from './returns-settings.utils';

export interface ReturnsSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReturnsSettingsSummary({
  compact = false,
  limit = 3,
}: ReturnsSettingsSummaryProps) {
  const items = buildReturnsSettingsItems();
  const totals = totalReturnsSettings(items);
  const highlights = pickReturnsSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RETURNS_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {RETURNS_SETTINGS_FEATURE.title}
      </h3>
      <FeedbackHeaderGroup
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
