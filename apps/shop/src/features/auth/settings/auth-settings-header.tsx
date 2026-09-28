import { MarketingBadge } from '../../../components/marketing/badge/marketing-badge';
import { AUTH_SETTINGS_FEATURE } from './auth-settings.routes';

export interface AuthSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AuthSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: AuthSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${AUTH_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{AUTH_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {AUTH_SETTINGS_FEATURE.domain} · {AUTH_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingBadge label="Items" value={count} tone="info" />
        <MarketingBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${AUTH_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
