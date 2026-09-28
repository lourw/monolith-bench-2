import { storagePercent } from '../../../utils/storage/storage-percent';
import { FeedbackStat } from '../../feedback/stat/feedback-stat';
import type { ChartsPanelProps } from './charts-panel.types';
import { resolveChartsPanelStyle } from './charts-panel-variants';

export function ChartsPanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-charts-panel',
  onSelect,
  children,
}: ChartsPanelProps) {
  const formatted = value === undefined ? '' : storagePercent(value);
  const style = resolveChartsPanelStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-charts-panel ui-element"
      data-testid={testId}
      data-tone={tone}
      data-size={size}
      style={style}
      aria-label={ariaLabel}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect ? handleClick : undefined}
    >
      <span className="ui-label">{label}</span>
      {formatted ? <span className="ui-value">{formatted}</span> : null}
      {children ? <div className="ui-content">{children}</div> : null}
      <FeedbackStat label="Feedback Stat" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default ChartsPanel;
