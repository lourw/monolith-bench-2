import { FeedbackTile } from '../../../components/feedback/tile/feedback-tile';
import { SHIPPING_EDITOR_FEATURE } from './shipping-editor.routes';

export interface ShippingEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ShippingEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: ShippingEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SHIPPING_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SHIPPING_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SHIPPING_EDITOR_FEATURE.domain} · {SHIPPING_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackTile label="Items" value={count} tone="info" />
        <FeedbackTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SHIPPING_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
