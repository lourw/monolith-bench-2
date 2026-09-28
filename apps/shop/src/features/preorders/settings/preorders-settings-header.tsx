import { FormsBanner } from '../../../components/forms/banner/forms-banner';
import { PREORDERS_SETTINGS_FEATURE } from './preorders-settings.routes';

export interface PreordersSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PreordersSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: PreordersSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PREORDERS_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PREORDERS_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PREORDERS_SETTINGS_FEATURE.domain} ·{' '}
          {PREORDERS_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsBanner label="Items" value={count} tone="info" />
        <FormsBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PREORDERS_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
