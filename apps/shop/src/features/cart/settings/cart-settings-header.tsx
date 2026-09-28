import { FeedbackCard } from '../../../components/feedback/card/feedback-card';
import { CART_SETTINGS_FEATURE } from './cart-settings.routes';

export interface CartSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CartSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: CartSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CART_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CART_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CART_SETTINGS_FEATURE.domain} · {CART_SETTINGS_FEATURE.kind}
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
          data-testid={`${CART_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
