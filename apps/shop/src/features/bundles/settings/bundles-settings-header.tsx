import { CommerceList } from '../../../components/commerce/list/commerce-list';
import { BUNDLES_SETTINGS_FEATURE } from './bundles-settings.routes';

export interface BundlesSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function BundlesSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: BundlesSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${BUNDLES_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{BUNDLES_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {BUNDLES_SETTINGS_FEATURE.domain} · {BUNDLES_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceList label="Items" value={count} tone="info" />
        <CommerceList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${BUNDLES_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
