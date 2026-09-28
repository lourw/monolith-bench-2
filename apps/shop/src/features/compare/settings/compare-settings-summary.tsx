import { FeedbackStatGroup } from '../../../components/feedback/stat/feedback-stat-group';
import { buildCompareSettingsItems } from './compare-settings.model';
import { COMPARE_SETTINGS_FEATURE } from './compare-settings.routes';
import {
  pickCompareSettingsHighlights,
  totalCompareSettings,
} from './compare-settings.utils';

export interface CompareSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CompareSettingsSummary({
  compact = false,
  limit = 3,
}: CompareSettingsSummaryProps) {
  const items = buildCompareSettingsItems();
  const totals = totalCompareSettings(items);
  const highlights = pickCompareSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${COMPARE_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {COMPARE_SETTINGS_FEATURE.title}
      </h3>
      <FeedbackStatGroup
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
