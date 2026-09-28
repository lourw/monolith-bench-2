import { CoreHeader } from '../../../components/core/header/core-header';
import { ACCOUNT_DETAILS_FEATURE } from './account-details.routes';

export interface AccountDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AccountDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: AccountDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ACCOUNT_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ACCOUNT_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ACCOUNT_DETAILS_FEATURE.domain} · {ACCOUNT_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreHeader label="Items" value={count} tone="info" />
        <CoreHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ACCOUNT_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
