import { ChartsBanner } from '../../../components/charts/banner/charts-banner';
import { ADDRESSES_EDITOR_FEATURE } from './addresses-editor.routes';

export interface AddressesEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AddressesEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: AddressesEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ADDRESSES_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ADDRESSES_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ADDRESSES_EDITOR_FEATURE.domain} · {ADDRESSES_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsBanner label="Items" value={count} tone="info" />
        <ChartsBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ADDRESSES_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
