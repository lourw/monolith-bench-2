import { TypographyTile } from '../../../components/typography/tile/typography-tile';
import { TRACKING_DASHBOARD_FEATURE } from './tracking-dashboard.routes';

export interface TrackingDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function TrackingDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: TrackingDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${TRACKING_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{TRACKING_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {TRACKING_DASHBOARD_FEATURE.domain} ·{' '}
          {TRACKING_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyTile label="Items" value={count} tone="info" />
        <TypographyTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${TRACKING_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
