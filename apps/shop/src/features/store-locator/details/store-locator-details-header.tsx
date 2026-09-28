import { FeedbackCard } from '../../../components/feedback/card/feedback-card';
import { STORE_LOCATOR_DETAILS_FEATURE } from './store-locator-details.routes';

export interface StoreLocatorDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function StoreLocatorDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: StoreLocatorDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${STORE_LOCATOR_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{STORE_LOCATOR_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {STORE_LOCATOR_DETAILS_FEATURE.domain} ·{' '}
          {STORE_LOCATOR_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackCard label="Items" value={count} tone="info" />
        <FeedbackCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${STORE_LOCATOR_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
