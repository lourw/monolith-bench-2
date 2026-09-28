import { TypographyHeader } from '../../../components/typography/header/typography-header';
import { INVENTORY_SETTINGS_FEATURE } from './inventory-settings.routes';

export interface InventorySettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function InventorySettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: InventorySettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${INVENTORY_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{INVENTORY_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {INVENTORY_SETTINGS_FEATURE.domain} ·{' '}
          {INVENTORY_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyHeader label="Items" value={count} tone="info" />
        <TypographyHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${INVENTORY_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
