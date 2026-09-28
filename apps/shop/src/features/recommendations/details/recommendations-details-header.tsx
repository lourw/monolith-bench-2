import { LayoutTile } from '../../../components/layout/tile/layout-tile';
import { RECOMMENDATIONS_DETAILS_FEATURE } from './recommendations-details.routes';

export interface RecommendationsDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function RecommendationsDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: RecommendationsDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {RECOMMENDATIONS_DETAILS_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {RECOMMENDATIONS_DETAILS_FEATURE.domain} ·{' '}
          {RECOMMENDATIONS_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutTile label="Items" value={count} tone="info" />
        <LayoutTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
