import { NavigationToolbar } from '../../../components/navigation/toolbar/navigation-toolbar';
import { BUNDLES_LIST_FEATURE } from './bundles-list.routes';

export interface BundlesListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function BundlesListHeader({
  count,
  total,
  loading,
  onRefresh,
}: BundlesListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${BUNDLES_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{BUNDLES_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {BUNDLES_LIST_FEATURE.domain} · {BUNDLES_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <NavigationToolbar label="Items" value={count} tone="info" />
        <NavigationToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${BUNDLES_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
