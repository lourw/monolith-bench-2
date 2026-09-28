import { formatAddress } from '../../../utils/format/format-address';
import { validateNumber } from '../../../utils/validate/validate-number';
import { formatText } from '../../../utils/format/format-text';
import { LayoutStat } from '../../layout/stat/layout-stat';
import type { NavigationListProps } from './navigation-list.types';
import { resolveNavigationListStyle } from './navigation-list-variants';

export function NavigationList({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-navigation-list',
  onSelect,
  children,
}: NavigationListProps) {
  const formatted = value === undefined ? '' : formatAddress(value);
  const style = resolveNavigationListStyle(tone, size);
  const ariaLabel = formatText(validateNumber(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-navigation-list ui-element"
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
      <LayoutStat label="Layout Stat" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default NavigationList;
