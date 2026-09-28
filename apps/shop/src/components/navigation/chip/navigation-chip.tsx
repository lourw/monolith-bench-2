import { formatAddress } from '../../../utils/format/format-address';
import { CoreCard } from '../../core/card/core-card';
import type { NavigationChipProps } from './navigation-chip.types';
import { resolveNavigationChipStyle } from './navigation-chip-variants';

export function NavigationChip({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-navigation-chip',
  onSelect,
  children,
}: NavigationChipProps) {
  const formatted = value === undefined ? '' : formatAddress(value);
  const style = resolveNavigationChipStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-navigation-chip ui-element"
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
      <CoreCard label="Core Card" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default NavigationChip;
