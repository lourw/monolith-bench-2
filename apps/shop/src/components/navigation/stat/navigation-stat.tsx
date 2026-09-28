import { asyncPhone } from '../../../utils/async/async-phone';
import { CorePanel } from '../../core/panel/core-panel';
import type { NavigationStatProps } from './navigation-stat.types';
import { resolveNavigationStatStyle } from './navigation-stat-variants';

export function NavigationStat({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-navigation-stat',
  onSelect,
  children,
}: NavigationStatProps) {
  const formatted = value === undefined ? '' : asyncPhone(value);
  const style = resolveNavigationStatStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-navigation-stat ui-element"
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
      <CorePanel label="Core Panel" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default NavigationStat;
