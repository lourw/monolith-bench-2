import { asyncCurrency } from '../../../utils/async/async-currency';
import { NavigationList } from '../../navigation/list/navigation-list';
import type { InputsBadgeProps } from './inputs-badge.types';
import { resolveInputsBadgeStyle } from './inputs-badge-variants';

export function InputsBadge({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-inputs-badge',
  onSelect,
  children,
}: InputsBadgeProps) {
  const formatted = value === undefined ? '' : asyncCurrency(value);
  const style = resolveInputsBadgeStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-inputs-badge ui-element"
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
      <NavigationList
        label="Navigation List"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default InputsBadge;
