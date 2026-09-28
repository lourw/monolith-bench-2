import { CommerceBadgeGroup } from '../../../components/commerce/badge/commerce-badge-group';
import { DataCard } from '../../../components/data/card/data-card';
import type { PromotionsDetailsItem } from './promotions-details.model';
import { PROMOTIONS_DETAILS_FEATURE } from './promotions-details.routes';
import { describePromotionsDetailsItem } from './promotions-details.utils';

export interface PromotionsDetailsPanelProps {
  selected: PromotionsDetailsItem | null;
  onClear: () => void;
}

export function PromotionsDetailsPanel({
  selected,
  onClear,
}: PromotionsDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PROMOTIONS_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${PROMOTIONS_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PROMOTIONS_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describePromotionsDetailsItem(selected)}
      </p>
      <CommerceBadgeGroup
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
        <DataCard label="Data Card" value={selected.product.rating} size="sm" />
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
        data-testid={`${PROMOTIONS_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
