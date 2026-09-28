import { LayoutHeader } from '../../../components/layout/header/layout-header';
import { PROFILE_SETTINGS_FEATURE } from './profile-settings.routes';

export interface ProfileSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ProfileSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: ProfileSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROFILE_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROFILE_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROFILE_SETTINGS_FEATURE.domain} · {PROFILE_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutHeader label="Items" value={count} tone="info" />
        <LayoutHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROFILE_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
