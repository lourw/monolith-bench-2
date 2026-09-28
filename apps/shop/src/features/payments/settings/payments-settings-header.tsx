import { ChartsBadge } from '../../../components/charts/badge/charts-badge';
import { PAYMENTS_SETTINGS_FEATURE } from './payments-settings.routes';

export interface PaymentsSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PaymentsSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: PaymentsSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PAYMENTS_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PAYMENTS_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PAYMENTS_SETTINGS_FEATURE.domain} · {PAYMENTS_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsBadge label="Items" value={count} tone="info" />
        <ChartsBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PAYMENTS_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
