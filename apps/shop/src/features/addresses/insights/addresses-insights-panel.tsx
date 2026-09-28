import { FormsStatGroup } from '../../../components/forms/stat/forms-stat-group';
import { FormsChip } from '../../../components/forms/chip/forms-chip';
import { FeedbackPanel } from '../../../components/feedback/panel/feedback-panel';
import type { AddressesInsightsItem } from './addresses-insights.model';
import { ADDRESSES_INSIGHTS_FEATURE } from './addresses-insights.routes';
import { describeAddressesInsightsItem } from './addresses-insights.utils';

export interface AddressesInsightsPanelProps {
  selected: AddressesInsightsItem | null;
  onClear: () => void;
}

export function AddressesInsightsPanel({
  selected,
  onClear,
}: AddressesInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ADDRESSES_INSIGHTS_FEATURE.testId}-panel`}
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
      data-testid={`${ADDRESSES_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ADDRESSES_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAddressesInsightsItem(selected)}
      </p>
      <FormsStatGroup
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
        <FormsChip
          label="Forms Chip"
          value={selected.product.rating}
          size="sm"
        />
        <FeedbackPanel
          label="Feedback Panel"
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
        data-testid={`${ADDRESSES_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
