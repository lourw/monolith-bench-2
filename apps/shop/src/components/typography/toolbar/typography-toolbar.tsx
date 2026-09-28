import { validateCurrency } from '../../../utils/validate/validate-currency';
import type { TypographyToolbarProps } from './typography-toolbar.types';
import { resolveTypographyToolbarStyle } from './typography-toolbar-variants';

export function TypographyToolbar({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-typography-toolbar',
  onSelect,
  children,
}: TypographyToolbarProps) {
  const formatted = value === undefined ? '' : validateCurrency(value);
  const style = resolveTypographyToolbarStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-typography-toolbar ui-element"
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

export default TypographyToolbar;
