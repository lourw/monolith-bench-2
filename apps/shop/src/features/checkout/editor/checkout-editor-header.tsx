import { DataHeader } from '../../../components/data/header/data-header';
import { CHECKOUT_EDITOR_FEATURE } from './checkout-editor.routes';

export interface CheckoutEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CheckoutEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: CheckoutEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CHECKOUT_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CHECKOUT_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CHECKOUT_EDITOR_FEATURE.domain} · {CHECKOUT_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataHeader label="Items" value={count} tone="info" />
        <DataHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CHECKOUT_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
