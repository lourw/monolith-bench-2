import { TypographyBadge } from '../../../components/typography/badge/typography-badge';
import { SUPPORT_SETTINGS_FEATURE } from './support-settings.routes';

export interface SupportSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SupportSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: SupportSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUPPORT_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUPPORT_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUPPORT_SETTINGS_FEATURE.domain} · {SUPPORT_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyBadge label="Items" value={count} tone="info" />
        <TypographyBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUPPORT_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
