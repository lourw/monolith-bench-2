import { FeedbackHeaderGroup } from '../../../components/feedback/header/feedback-header-group';
import { CommerceToolbar } from '../../../components/commerce/toolbar/commerce-toolbar';
import { CoreHeader } from '../../../components/core/header/core-header';
import type { StoreLocatorSummaryItem } from './store-locator-summary.model';
import { STORE_LOCATOR_SUMMARY_FEATURE } from './store-locator-summary.routes';
import { describeStoreLocatorSummaryItem } from './store-locator-summary.utils';

export interface StoreLocatorSummaryPanelProps {
  selected: StoreLocatorSummaryItem | null;
  onClear: () => void;
}

export function StoreLocatorSummaryPanel({
  selected,
  onClear,
}: StoreLocatorSummaryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${STORE_LOCATOR_SUMMARY_FEATURE.testId}-panel`}
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
      data-testid={`${STORE_LOCATOR_SUMMARY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${STORE_LOCATOR_SUMMARY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeStoreLocatorSummaryItem(selected)}
      </p>
      <FeedbackHeaderGroup
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
        <CommerceToolbar
          label="Commerce Toolbar"
          value={selected.product.rating}
          size="sm"
        />
        <CoreHeader
          label="Core Header"
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
        data-testid={`${STORE_LOCATOR_SUMMARY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
