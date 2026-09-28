import { FeedbackList } from '../../../components/feedback/list/feedback-list';
import { RECOMMENDATIONS_LIST_FEATURE } from './recommendations-list.routes';

export interface RecommendationsListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function RecommendationsListHeader({
  count,
  total,
  loading,
  onRefresh,
}: RecommendationsListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RECOMMENDATIONS_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{RECOMMENDATIONS_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {RECOMMENDATIONS_LIST_FEATURE.domain} ·{' '}
          {RECOMMENDATIONS_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackList label="Items" value={count} tone="info" />
        <FeedbackList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RECOMMENDATIONS_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
