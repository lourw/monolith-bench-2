import { storageNumber } from '../../../utils/storage/storage-number';
import { FormsChip } from '../../forms/chip/forms-chip';
import type { FeedbackBadgeProps } from './feedback-badge.types';
import { resolveFeedbackBadgeStyle } from './feedback-badge-variants';

export function FeedbackBadge({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-feedback-badge',
  onSelect,
  children,
}: FeedbackBadgeProps) {
  const formatted = value === undefined ? '' : storageNumber(value);
  const style = resolveFeedbackBadgeStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-feedback-badge ui-element"
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
      <FormsChip label="Forms Chip" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default FeedbackBadge;
