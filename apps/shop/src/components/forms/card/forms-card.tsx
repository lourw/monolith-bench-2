import { asyncNumber } from '../../../utils/async/async-number';
import { FormsBadge } from '../badge/forms-badge';
import type { FormsCardProps } from './forms-card.types';
import { resolveFormsCardStyle } from './forms-card-variants';

export function FormsCard({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-forms-card',
  onSelect,
  children,
}: FormsCardProps) {
  const formatted = value === undefined ? '' : asyncNumber(value);
  const style = resolveFormsCardStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-forms-card ui-element"
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
      <FormsBadge label="Forms Badge" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default FormsCard;
