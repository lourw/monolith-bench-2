import { CommerceCardGroup } from '../../../components/commerce/card/commerce-card-group';
import { CommerceList } from '../../../components/commerce/list/commerce-list';
import { FeedbackBanner } from '../../../components/feedback/banner/feedback-banner';
import type { AnalyticsSummaryItem } from './analytics-summary.model';
import { ANALYTICS_SUMMARY_FEATURE } from './analytics-summary.routes';
import { describeAnalyticsSummaryItem } from './analytics-summary.utils';

export interface AnalyticsSummaryPanelProps {
  selected: AnalyticsSummaryItem | null;
  onClear: () => void;
}

export function AnalyticsSummaryPanel({
  selected,
  onClear,
}: AnalyticsSummaryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ANALYTICS_SUMMARY_FEATURE.testId}-panel`}
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
      data-testid={`${ANALYTICS_SUMMARY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ANALYTICS_SUMMARY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAnalyticsSummaryItem(selected)}
      </p>
      <CommerceCardGroup
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
        <CommerceList
          label="Commerce List"
          value={selected.product.rating}
          size="sm"
        />
        <FeedbackBanner
          label="Feedback Banner"
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
        data-testid={`${ANALYTICS_SUMMARY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
