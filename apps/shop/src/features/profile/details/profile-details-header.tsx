import { MediaCard } from '../../../components/media/card/media-card';
import { PROFILE_DETAILS_FEATURE } from './profile-details.routes';

export interface ProfileDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ProfileDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: ProfileDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROFILE_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROFILE_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROFILE_DETAILS_FEATURE.domain} · {PROFILE_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaCard label="Items" value={count} tone="info" />
        <MediaCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROFILE_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
