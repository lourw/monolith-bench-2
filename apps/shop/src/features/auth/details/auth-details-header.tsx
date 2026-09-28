import { DataCard } from '../../../components/data/card/data-card';
import { AUTH_DETAILS_FEATURE } from './auth-details.routes';

export interface AuthDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AuthDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: AuthDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${AUTH_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{AUTH_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {AUTH_DETAILS_FEATURE.domain} · {AUTH_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataCard label="Items" value={count} tone="info" />
        <DataCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${AUTH_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
