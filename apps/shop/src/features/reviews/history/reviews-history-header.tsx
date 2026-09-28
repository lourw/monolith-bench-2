import { NavigationToolbar } from '../../../components/navigation/toolbar/navigation-toolbar';
import { REVIEWS_HISTORY_FEATURE } from './reviews-history.routes';

export interface ReviewsHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReviewsHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReviewsHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${REVIEWS_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{REVIEWS_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {REVIEWS_HISTORY_FEATURE.domain} · {REVIEWS_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <NavigationToolbar label="Items" value={count} tone="info" />
        <NavigationToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${REVIEWS_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
