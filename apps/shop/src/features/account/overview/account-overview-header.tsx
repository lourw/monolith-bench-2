import { DataStat } from '../../../components/data/stat/data-stat';
import { ACCOUNT_OVERVIEW_FEATURE } from './account-overview.routes';

export interface AccountOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AccountOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: AccountOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ACCOUNT_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ACCOUNT_OVERVIEW_FEATURE.domain} · {ACCOUNT_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataStat label="Items" value={count} tone="info" />
        <DataStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
