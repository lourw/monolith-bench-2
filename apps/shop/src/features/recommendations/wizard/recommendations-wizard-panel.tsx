import { DataPanelGroup } from '../../../components/data/panel/data-panel-group';
import { MediaPanel } from '../../../components/media/panel/media-panel';
import { FeedbackPanel } from '../../../components/feedback/panel/feedback-panel';
import type { RecommendationsWizardItem } from './recommendations-wizard.model';
import { RECOMMENDATIONS_WIZARD_FEATURE } from './recommendations-wizard.routes';
import { describeRecommendationsWizardItem } from './recommendations-wizard.utils';

export interface RecommendationsWizardPanelProps {
  selected: RecommendationsWizardItem | null;
  onClear: () => void;
}

export function RecommendationsWizardPanel({
  selected,
  onClear,
}: RecommendationsWizardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-panel`}
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
      data-testid={`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeRecommendationsWizardItem(selected)}
      </p>
      <DataPanelGroup
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
        <MediaPanel
          label="Media Panel"
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
        data-testid={`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
