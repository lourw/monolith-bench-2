import { TypographyToolbarGroup } from '../../../components/typography/toolbar/typography-toolbar-group';
import { buildSearchSettingsItems } from './search-settings.model';
import { SEARCH_SETTINGS_FEATURE } from './search-settings.routes';
import {
  pickSearchSettingsHighlights,
  totalSearchSettings,
} from './search-settings.utils';

export interface SearchSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SearchSettingsSummary({
  compact = false,
  limit = 3,
}: SearchSettingsSummaryProps) {
  const items = buildSearchSettingsItems();
  const totals = totalSearchSettings(items);
  const highlights = pickSearchSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SEARCH_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SEARCH_SETTINGS_FEATURE.title}</h3>
      <TypographyToolbarGroup
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
