import { asyncPhone } from '../../../utils/async/async-phone';
import { formatNumber } from '../../../utils/format/format-number';
import { CoreCard } from '../../core/card/core-card';
import type { FeedbackHeaderProps } from './feedback-header.types';
import { resolveFeedbackHeaderStyle } from './feedback-header-variants';

export function FeedbackHeader({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-feedback-header',
  onSelect,
  children,
}: FeedbackHeaderProps) {
  const formatted = value === undefined ? '' : asyncPhone(value);
  const style = resolveFeedbackHeaderStyle(tone, size);
  const ariaLabel = formatNumber(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-feedback-header ui-element"
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
      <CoreCard label="Core Card" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default FeedbackHeader;
