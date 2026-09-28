import { CoreTile } from '../../../components/core/tile/core-tile';
import { ACCOUNT_LIST_FEATURE } from './account-list.routes';

export interface AccountListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AccountListHeader({
  count,
  total,
  loading,
  onRefresh,
}: AccountListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ACCOUNT_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ACCOUNT_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ACCOUNT_LIST_FEATURE.domain} · {ACCOUNT_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreTile label="Items" value={count} tone="info" />
        <CoreTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ACCOUNT_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
