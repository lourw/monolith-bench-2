import { LayoutBadge } from '../../../components/layout/badge/layout-badge';
import { PROFILE_SUMMARY_FEATURE } from './profile-summary.routes';

export interface ProfileSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ProfileSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: ProfileSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROFILE_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROFILE_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROFILE_SUMMARY_FEATURE.domain} · {PROFILE_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutBadge label="Items" value={count} tone="info" />
        <LayoutBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROFILE_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
