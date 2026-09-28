import { formatPercent } from '../../../utils/format/format-percent';
import { mathSlug } from '../../../utils/math/math-slug';
import { CoreStat } from '../../core/stat/core-stat';
import type { FeedbackStatProps } from './feedback-stat.types';
import { resolveFeedbackStatStyle } from './feedback-stat-variants';

export function FeedbackStat({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-feedback-stat',
  onSelect,
  children,
}: FeedbackStatProps) {
  const formatted = value === undefined ? '' : formatPercent(value);
  const style = resolveFeedbackStatStyle(tone, size);
  const ariaLabel = mathSlug(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-feedback-stat ui-element"
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
      <CoreStat label="Core Stat" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default FeedbackStat;
