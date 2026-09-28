import { FeedbackBanner } from '../../../components/feedback/banner/feedback-banner';
import { STORE_LOCATOR_HISTORY_FEATURE } from './store-locator-history.routes';

export interface StoreLocatorHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function StoreLocatorHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: StoreLocatorHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${STORE_LOCATOR_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{STORE_LOCATOR_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {STORE_LOCATOR_HISTORY_FEATURE.domain} ·{' '}
          {STORE_LOCATOR_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackBanner label="Items" value={count} tone="info" />
        <FeedbackBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${STORE_LOCATOR_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
