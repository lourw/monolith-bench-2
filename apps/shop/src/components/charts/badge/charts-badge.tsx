import { formatNumber } from '../../../utils/format/format-number';
import { i18nSlug } from '../../../utils/i18n/i18n-slug';
import { FeedbackToolbar } from '../../feedback/toolbar/feedback-toolbar';
import type { ChartsBadgeProps } from './charts-badge.types';
import { resolveChartsBadgeStyle } from './charts-badge-variants';

export function ChartsBadge({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-charts-badge',
  onSelect,
  children,
}: ChartsBadgeProps) {
  const formatted = value === undefined ? '' : formatNumber(value);
  const style = resolveChartsBadgeStyle(tone, size);
  const ariaLabel = i18nSlug(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-charts-badge ui-element"
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
      <FeedbackToolbar
        label="Feedback Toolbar"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default ChartsBadge;
