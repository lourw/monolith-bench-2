import { validateAddress } from '../../../utils/validate/validate-address';
import { asyncSlug } from '../../../utils/async/async-slug';
import { OverlayChip } from '../chip/overlay-chip';
import type { OverlayListProps } from './overlay-list.types';
import { resolveOverlayListStyle } from './overlay-list-variants';

export function OverlayList({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-overlay-list',
  onSelect,
  children,
}: OverlayListProps) {
  const formatted = value === undefined ? '' : validateAddress(value);
  const style = resolveOverlayListStyle(tone, size);
  const ariaLabel = asyncSlug(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-overlay-list ui-element"
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
      <OverlayChip label="Overlay Chip" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default OverlayList;
