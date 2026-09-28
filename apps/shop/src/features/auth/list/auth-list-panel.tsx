import { MarketingBadgeGroup } from '../../../components/marketing/badge/marketing-badge-group';
import { LayoutTile } from '../../../components/layout/tile/layout-tile';
import type { AuthListItem } from './auth-list.model';
import { AUTH_LIST_FEATURE } from './auth-list.routes';
import { describeAuthListItem } from './auth-list.utils';

export interface AuthListPanelProps {
  selected: AuthListItem | null;
  onClear: () => void;
}

export function AuthListPanel({ selected, onClear }: AuthListPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${AUTH_LIST_FEATURE.testId}-panel`}
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
      data-testid={`${AUTH_LIST_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${AUTH_LIST_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAuthListItem(selected)}
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
      <div className="feature-panel-extra">
        <LayoutTile
          label="Layout Tile"
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
        data-testid={`${AUTH_LIST_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
