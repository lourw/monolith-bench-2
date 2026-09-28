import { InputsStat } from '../../../components/inputs/stat/inputs-stat';
import { STORE_LOCATOR_SUMMARY_FEATURE } from './store-locator-summary.routes';

export interface StoreLocatorSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function StoreLocatorSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: StoreLocatorSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${STORE_LOCATOR_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{STORE_LOCATOR_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {STORE_LOCATOR_SUMMARY_FEATURE.domain} ·{' '}
          {STORE_LOCATOR_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <InputsStat label="Items" value={count} tone="info" />
        <InputsStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${STORE_LOCATOR_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
