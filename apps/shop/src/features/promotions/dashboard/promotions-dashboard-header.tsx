import { DataTile } from '../../../components/data/tile/data-tile';
import { PROMOTIONS_DASHBOARD_FEATURE } from './promotions-dashboard.routes';

export interface PromotionsDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PromotionsDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: PromotionsDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROMOTIONS_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROMOTIONS_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROMOTIONS_DASHBOARD_FEATURE.domain} ·{' '}
          {PROMOTIONS_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataTile label="Items" value={count} tone="info" />
        <DataTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROMOTIONS_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
