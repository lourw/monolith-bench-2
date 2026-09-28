import { collectionSlug } from '../../../utils/collection/collection-slug';
import { CommerceCard } from '../../commerce/card/commerce-card';
import type { InputsChipProps } from './inputs-chip.types';
import { resolveInputsChipStyle } from './inputs-chip-variants';

export function InputsChip({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-inputs-chip',
  onSelect,
  children,
}: InputsChipProps) {
  const formatted = value === undefined ? '' : collectionSlug(value);
  const style = resolveInputsChipStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-inputs-chip ui-element"
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
      <CommerceCard label="Commerce Card" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default InputsChip;
