import { CoreHeader } from '../../../components/core/header/core-header';
import { CART_EDITOR_FEATURE } from './cart-editor.routes';

export interface CartEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CartEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: CartEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CART_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CART_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CART_EDITOR_FEATURE.domain} · {CART_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreHeader label="Items" value={count} tone="info" />
        <CoreHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CART_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
