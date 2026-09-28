import { FormsToolbar } from '../../../components/forms/toolbar/forms-toolbar';
import { PROFILE_INSIGHTS_FEATURE } from './profile-insights.routes';

export interface ProfileInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ProfileInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: ProfileInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROFILE_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROFILE_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROFILE_INSIGHTS_FEATURE.domain} · {PROFILE_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsToolbar label="Items" value={count} tone="info" />
        <FormsToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROFILE_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
