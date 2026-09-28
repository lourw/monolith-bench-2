import { LayoutCardGroup } from '../../../components/layout/card/layout-card-group';
import { TypographyPanel } from '../../../components/typography/panel/typography-panel';
import { ChartsTile } from '../../../components/charts/tile/charts-tile';
import type { PaymentsHistoryItem } from './payments-history.model';
import { PAYMENTS_HISTORY_FEATURE } from './payments-history.routes';
import { describePaymentsHistoryItem } from './payments-history.utils';

export interface PaymentsHistoryPanelProps {
  selected: PaymentsHistoryItem | null;
  onClear: () => void;
}

export function PaymentsHistoryPanel({
  selected,
  onClear,
}: PaymentsHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PAYMENTS_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${PAYMENTS_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PAYMENTS_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describePaymentsHistoryItem(selected)}
      </p>
      <LayoutCardGroup
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
        <TypographyPanel
          label="Typography Panel"
          value={selected.product.rating}
          size="sm"
        />
        <ChartsTile
          label="Charts Tile"
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
        data-testid={`${PAYMENTS_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
