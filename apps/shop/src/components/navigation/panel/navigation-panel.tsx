import { asyncCurrency } from '../../../utils/async/async-currency';
import { validateNumber } from '../../../utils/validate/validate-number';
import { validateDate } from '../../../utils/validate/validate-date';
import type { NavigationPanelProps } from './navigation-panel.types';
import { resolveNavigationPanelStyle } from './navigation-panel-variants';

export function NavigationPanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-navigation-panel',
  onSelect,
  children,
}: NavigationPanelProps) {
  const formatted = value === undefined ? '' : asyncCurrency(value);
  const style = resolveNavigationPanelStyle(tone, size);
  const ariaLabel = validateDate(validateNumber(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-navigation-panel ui-element"
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

export default NavigationPanel;
