import { asyncName } from '../../../utils/async/async-name';
import { FeedbackChip } from '../../feedback/chip/feedback-chip';
import type { ChartsListProps } from './charts-list.types';
import { resolveChartsListStyle } from './charts-list-variants';

export function ChartsList({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-charts-list',
  onSelect,
  children,
}: ChartsListProps) {
  const formatted = value === undefined ? '' : asyncName(value);
  const style = resolveChartsListStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-charts-list ui-element"
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
      <FeedbackChip label="Feedback Chip" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default ChartsList;
