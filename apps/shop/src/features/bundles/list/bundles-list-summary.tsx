import { NavigationToolbarGroup } from '../../../components/navigation/toolbar/navigation-toolbar-group';
import { buildBundlesListItems } from './bundles-list.model';
import { BUNDLES_LIST_FEATURE } from './bundles-list.routes';
import {
  pickBundlesListHighlights,
  totalBundlesList,
} from './bundles-list.utils';

export interface BundlesListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function BundlesListSummary({
  compact = false,
  limit = 3,
}: BundlesListSummaryProps) {
  const items = buildBundlesListItems();
  const totals = totalBundlesList(items);
  const highlights = pickBundlesListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${BUNDLES_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{BUNDLES_LIST_FEATURE.title}</h3>
      <NavigationToolbarGroup
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
