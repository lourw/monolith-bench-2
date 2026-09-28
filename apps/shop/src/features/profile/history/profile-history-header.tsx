import { CommerceTile } from '../../../components/commerce/tile/commerce-tile';
import { PROFILE_HISTORY_FEATURE } from './profile-history.routes';

export interface ProfileHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ProfileHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: ProfileHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROFILE_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROFILE_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROFILE_HISTORY_FEATURE.domain} · {PROFILE_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceTile label="Items" value={count} tone="info" />
        <CommerceTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROFILE_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
