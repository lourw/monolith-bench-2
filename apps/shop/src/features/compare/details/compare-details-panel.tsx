import { MarketingBadgeGroup } from '../../../components/marketing/badge/marketing-badge-group';
import type { CompareDetailsItem } from './compare-details.model';
import { COMPARE_DETAILS_FEATURE } from './compare-details.routes';
import { describeCompareDetailsItem } from './compare-details.utils';

export interface CompareDetailsPanelProps {
  selected: CompareDetailsItem | null;
  onClear: () => void;
}

export function CompareDetailsPanel({
  selected,
  onClear,
}: CompareDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${COMPARE_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${COMPARE_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${COMPARE_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCompareDetailsItem(selected)}
      </p>
      <MarketingBadgeGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra"></div>
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
        data-testid={`${COMPARE_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
