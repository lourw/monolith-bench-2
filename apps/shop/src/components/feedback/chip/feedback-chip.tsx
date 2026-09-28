import { asyncPhone } from '../../../utils/async/async-phone';
import { validatePercent } from '../../../utils/validate/validate-percent';
import { mathCode } from '../../../utils/math/math-code';
import type { FeedbackChipProps } from './feedback-chip.types';
import { resolveFeedbackChipStyle } from './feedback-chip-variants';

export function FeedbackChip({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-feedback-chip',
  onSelect,
  children,
}: FeedbackChipProps) {
  const formatted = value === undefined ? '' : asyncPhone(value);
  const style = resolveFeedbackChipStyle(tone, size);
  const ariaLabel = mathCode(validatePercent(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-feedback-chip ui-element"
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
    </div>
  );
}

export default FeedbackChip;
