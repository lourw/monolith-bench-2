import { storageCurrency } from '../../../utils/storage/storage-currency';
import { CoreChip } from '../../core/chip/core-chip';
import type { OverlayHeaderProps } from './overlay-header.types';
import { resolveOverlayHeaderStyle } from './overlay-header-variants';

export function OverlayHeader({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-overlay-header',
  onSelect,
  children,
}: OverlayHeaderProps) {
  const formatted = value === undefined ? '' : storageCurrency(value);
  const style = resolveOverlayHeaderStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-overlay-header ui-element"
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

export default OverlayHeader;
