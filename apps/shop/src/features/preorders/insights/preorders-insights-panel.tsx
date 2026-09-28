import { CommerceToolbarGroup } from '../../../components/commerce/toolbar/commerce-toolbar-group';
import { CoreStat } from '../../../components/core/stat/core-stat';
import { ChartsBanner } from '../../../components/charts/banner/charts-banner';
import type { PreordersInsightsItem } from './preorders-insights.model';
import { PREORDERS_INSIGHTS_FEATURE } from './preorders-insights.routes';
import { describePreordersInsightsItem } from './preorders-insights.utils';

export interface PreordersInsightsPanelProps {
  selected: PreordersInsightsItem | null;
  onClear: () => void;
}

export function PreordersInsightsPanel({
  selected,
  onClear,
}: PreordersInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PREORDERS_INSIGHTS_FEATURE.testId}-panel`}
      >
        <p className="feature-panel-hint">
          Select an entry to see its details.
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="feature-panel"
      data-testid={`${PREORDERS_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PREORDERS_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describePreordersInsightsItem(selected)}
      </p>
      <CommerceToolbarGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra">
        <CoreStat label="Core Stat" value={selected.product.rating} size="sm" />
        <ChartsBanner
          label="Charts Banner"
          value={selected.product.rating}
          size="sm"
        />
      </div>
      <ul className="feature-tags">
        {selected.tags.map((tag) => (
          <li key={tag} className="feature-tag">
            {tag}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="feature-button secondary"
        onClick={onClear}
        data-testid={`${PREORDERS_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
