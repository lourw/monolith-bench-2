import { CommerceStat } from '../../../components/commerce/stat/commerce-stat';
import { AUTH_SUMMARY_FEATURE } from './auth-summary.routes';

export interface AuthSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AuthSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: AuthSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${AUTH_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{AUTH_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {AUTH_SUMMARY_FEATURE.domain} · {AUTH_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceStat label="Items" value={count} tone="info" />
        <CommerceStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${AUTH_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
