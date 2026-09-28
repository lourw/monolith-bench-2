import { CommerceBadge } from '../../../components/commerce/badge/commerce-badge';
import { REVIEWS_OVERVIEW_FEATURE } from './reviews-overview.routes';

export interface ReviewsOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReviewsOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReviewsOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${REVIEWS_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{REVIEWS_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {REVIEWS_OVERVIEW_FEATURE.domain} · {REVIEWS_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceBadge label="Items" value={count} tone="info" />
        <CommerceBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${REVIEWS_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
