import { validateNumber } from '../../../utils/validate/validate-number';
import type { NavigationHeaderProps } from './navigation-header.types';
import { resolveNavigationHeaderStyle } from './navigation-header-variants';

export function NavigationHeader({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-navigation-header',
  onSelect,
  children,
}: NavigationHeaderProps) {
  const formatted = value === undefined ? '' : validateNumber(value);
  const style = resolveNavigationHeaderStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-navigation-header ui-element"
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

export default NavigationHeader;
