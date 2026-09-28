import { FeedbackTile } from '../../../components/feedback/tile/feedback-tile';
import { RECOMMENDATIONS_WIZARD_FEATURE } from './recommendations-wizard.routes';

export interface RecommendationsWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function RecommendationsWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: RecommendationsWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {RECOMMENDATIONS_WIZARD_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {RECOMMENDATIONS_WIZARD_FEATURE.domain} ·{' '}
          {RECOMMENDATIONS_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackTile label="Items" value={count} tone="info" />
        <FeedbackTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
