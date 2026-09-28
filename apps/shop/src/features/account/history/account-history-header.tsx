import { ChartsToolbar } from '../../../components/charts/toolbar/charts-toolbar';
import { ACCOUNT_HISTORY_FEATURE } from './account-history.routes';

export interface AccountHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AccountHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: AccountHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ACCOUNT_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ACCOUNT_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ACCOUNT_HISTORY_FEATURE.domain} · {ACCOUNT_HISTORY_FEATURE.kind}
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
          data-testid={`${ACCOUNT_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
