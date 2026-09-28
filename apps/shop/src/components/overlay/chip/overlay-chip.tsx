import { validateCode } from '../../../utils/validate/validate-code';
import { formatName } from '../../../utils/format/format-name';
import type { OverlayChipProps } from './overlay-chip.types';
import { resolveOverlayChipStyle } from './overlay-chip-variants';

export function OverlayChip({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-overlay-chip',
  onSelect,
  children,
}: OverlayChipProps) {
  const formatted = value === undefined ? '' : validateCode(value);
  const style = resolveOverlayChipStyle(tone, size);
  const ariaLabel = formatName(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-overlay-chip ui-element"
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

export default OverlayChip;
