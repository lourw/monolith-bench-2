import { TypographyToolbar } from '../../../components/typography/toolbar/typography-toolbar';
import { INVENTORY_EDITOR_FEATURE } from './inventory-editor.routes';

export interface InventoryEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function InventoryEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: InventoryEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${INVENTORY_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{INVENTORY_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {INVENTORY_EDITOR_FEATURE.domain} · {INVENTORY_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyToolbar label="Items" value={count} tone="info" />
        <TypographyToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${INVENTORY_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
