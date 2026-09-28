import { FormsPanelGroup } from '../../../components/forms/panel/forms-panel-group';
import { buildSearchDetailsItems } from './search-details.model';
import { SEARCH_DETAILS_FEATURE } from './search-details.routes';
import {
  pickSearchDetailsHighlights,
  totalSearchDetails,
} from './search-details.utils';

export interface SearchDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SearchDetailsSummary({
  compact = false,
  limit = 3,
}: SearchDetailsSummaryProps) {
  const items = buildSearchDetailsItems();
  const totals = totalSearchDetails(items);
  const highlights = pickSearchDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SEARCH_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SEARCH_DETAILS_FEATURE.title}</h3>
      <FormsPanelGroup
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
