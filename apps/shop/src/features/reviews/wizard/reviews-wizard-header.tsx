import { FeedbackCard } from '../../../components/feedback/card/feedback-card';
import { REVIEWS_WIZARD_FEATURE } from './reviews-wizard.routes';

export interface ReviewsWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReviewsWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReviewsWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${REVIEWS_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{REVIEWS_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {REVIEWS_WIZARD_FEATURE.domain} · {REVIEWS_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackCard label="Items" value={count} tone="info" />
        <FeedbackCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${REVIEWS_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
