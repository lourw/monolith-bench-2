import { FormsCard } from '../../../components/forms/card/forms-card';
import { PROFILE_LIST_FEATURE } from './profile-list.routes';

export interface ProfileListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ProfileListHeader({
  count,
  total,
  loading,
  onRefresh,
}: ProfileListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROFILE_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROFILE_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROFILE_LIST_FEATURE.domain} · {PROFILE_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsCard label="Items" value={count} tone="info" />
        <FormsCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROFILE_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
