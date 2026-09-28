import { MediaHeader } from '../../../components/media/header/media-header';
import { SUPPORT_DASHBOARD_FEATURE } from './support-dashboard.routes';

export interface SupportDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SupportDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: SupportDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUPPORT_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUPPORT_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUPPORT_DASHBOARD_FEATURE.domain} · {SUPPORT_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaHeader label="Items" value={count} tone="info" />
        <MediaHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUPPORT_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
