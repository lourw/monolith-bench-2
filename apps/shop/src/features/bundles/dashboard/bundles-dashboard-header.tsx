import { CommerceToolbar } from '../../../components/commerce/toolbar/commerce-toolbar';
import { BUNDLES_DASHBOARD_FEATURE } from './bundles-dashboard.routes';

export interface BundlesDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function BundlesDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: BundlesDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${BUNDLES_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{BUNDLES_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {BUNDLES_DASHBOARD_FEATURE.domain} · {BUNDLES_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceToolbar label="Items" value={count} tone="info" />
        <CommerceToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${BUNDLES_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
