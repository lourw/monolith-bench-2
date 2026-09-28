import { MediaBadge } from '../../../components/media/badge/media-badge';
import { RECOMMENDATIONS_SUMMARY_FEATURE } from './recommendations-summary.routes';

export interface RecommendationsSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function RecommendationsSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: RecommendationsSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {RECOMMENDATIONS_SUMMARY_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {RECOMMENDATIONS_SUMMARY_FEATURE.domain} ·{' '}
          {RECOMMENDATIONS_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaBadge label="Items" value={count} tone="info" />
        <MediaBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
