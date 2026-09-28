import { FormsBanner } from '../../../components/forms/banner/forms-banner';
import { AUTH_LIST_FEATURE } from './auth-list.routes';

export interface AuthListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AuthListHeader({
  count,
  total,
  loading,
  onRefresh,
}: AuthListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${AUTH_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{AUTH_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {AUTH_LIST_FEATURE.domain} · {AUTH_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsBanner label="Items" value={count} tone="info" />
        <FormsBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${AUTH_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
