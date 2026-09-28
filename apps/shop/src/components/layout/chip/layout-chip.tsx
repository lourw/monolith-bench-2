import { collectionText } from '../../../utils/collection/collection-text';
import type { LayoutChipProps } from './layout-chip.types';
import { resolveLayoutChipStyle } from './layout-chip-variants';

export function LayoutChip({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-layout-chip',
  onSelect,
  children,
}: LayoutChipProps) {
  const formatted = value === undefined ? '' : collectionText(value);
  const style = resolveLayoutChipStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-layout-chip ui-element"
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

export default LayoutChip;
