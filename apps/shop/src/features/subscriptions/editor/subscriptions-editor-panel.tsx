import { MarketingStatGroup } from '../../../components/marketing/stat/marketing-stat-group';
import { CommerceTile } from '../../../components/commerce/tile/commerce-tile';
import { FormsHeader } from '../../../components/forms/header/forms-header';
import type { SubscriptionsEditorItem } from './subscriptions-editor.model';
import { SUBSCRIPTIONS_EDITOR_FEATURE } from './subscriptions-editor.routes';
import { describeSubscriptionsEditorItem } from './subscriptions-editor.utils';

export interface SubscriptionsEditorPanelProps {
  selected: SubscriptionsEditorItem | null;
  onClear: () => void;
}

export function SubscriptionsEditorPanel({
  selected,
  onClear,
}: SubscriptionsEditorPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-panel`}
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
      data-testid={`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSubscriptionsEditorItem(selected)}
      </p>
      <MarketingStatGroup
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
        <CommerceTile
          label="Commerce Tile"
          value={selected.product.rating}
          size="sm"
        />
        <FormsHeader
          label="Forms Header"
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
        data-testid={`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
