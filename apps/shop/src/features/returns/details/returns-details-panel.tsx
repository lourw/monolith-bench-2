import { CorePanelGroup } from '../../../components/core/panel/core-panel-group';
import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import { CommerceList } from '../../../components/commerce/list/commerce-list';
import type { ReturnsDetailsItem } from './returns-details.model';
import { RETURNS_DETAILS_FEATURE } from './returns-details.routes';
import { describeReturnsDetailsItem } from './returns-details.utils';

export interface ReturnsDetailsPanelProps {
  selected: ReturnsDetailsItem | null;
  onClear: () => void;
}

export function ReturnsDetailsPanel({
  selected,
  onClear,
}: ReturnsDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${RETURNS_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${RETURNS_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${RETURNS_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeReturnsDetailsItem(selected)}
      </p>
      <CorePanelGroup
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
        <FormsBadge
          label="Forms Badge"
          value={selected.product.rating}
          size="sm"
        />
        <CommerceList
          label="Commerce List"
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
        data-testid={`${RETURNS_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
