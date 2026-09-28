import { NavigationList } from '../../../components/navigation/list/navigation-list';
import { COMPARE_SUMMARY_FEATURE } from './compare-summary.routes';

export interface CompareSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CompareSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: CompareSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${COMPARE_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{COMPARE_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {COMPARE_SUMMARY_FEATURE.domain} · {COMPARE_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <NavigationList label="Items" value={count} tone="info" />
        <NavigationList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${COMPARE_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
