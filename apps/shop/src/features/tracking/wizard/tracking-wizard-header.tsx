import { MediaStat } from '../../../components/media/stat/media-stat';
import { TRACKING_WIZARD_FEATURE } from './tracking-wizard.routes';

export interface TrackingWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function TrackingWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: TrackingWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${TRACKING_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{TRACKING_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {TRACKING_WIZARD_FEATURE.domain} · {TRACKING_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaStat label="Items" value={count} tone="info" />
        <MediaStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${TRACKING_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
