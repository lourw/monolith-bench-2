import { validateSlug } from '../../../utils/validate/validate-slug';
import { formatCurrency } from '../../../utils/format/format-currency';
import { CoreChip } from '../../core/chip/core-chip';
import type { FormsBadgeProps } from './forms-badge.types';
import { resolveFormsBadgeStyle } from './forms-badge-variants';

export function FormsBadge({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-forms-badge',
  onSelect,
  children,
}: FormsBadgeProps) {
  const formatted = value === undefined ? '' : validateSlug(value);
  const style = resolveFormsBadgeStyle(tone, size);
  const ariaLabel = formatCurrency(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-forms-badge ui-element"
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
      <CoreChip label="Core Chip" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default FormsBadge;
