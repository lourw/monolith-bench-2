import { TypographyHeaderGroup } from '../../../components/typography/header/typography-header-group';
import type { AccountOverviewItem } from './account-overview.model';
import { ACCOUNT_OVERVIEW_FEATURE } from './account-overview.routes';
import { describeAccountOverviewItem } from './account-overview.utils';

export interface AccountOverviewPanelProps {
  selected: AccountOverviewItem | null;
  onClear: () => void;
}

export function AccountOverviewPanel({
  selected,
  onClear,
}: AccountOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAccountOverviewItem(selected)}
      </p>
      <TypographyHeaderGroup
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
        data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
