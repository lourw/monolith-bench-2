import { ChartsToolbar } from '../../../components/charts/toolbar/charts-toolbar';
import { AUTH_INSIGHTS_FEATURE } from './auth-insights.routes';

export interface AuthInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AuthInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: AuthInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${AUTH_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{AUTH_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {AUTH_INSIGHTS_FEATURE.domain} · {AUTH_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsToolbar label="Items" value={count} tone="info" />
        <ChartsToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${AUTH_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
