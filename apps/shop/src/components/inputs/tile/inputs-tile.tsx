import { mathPercent } from '../../../utils/math/math-percent';
import { collectionSlug } from '../../../utils/collection/collection-slug';
import { CommercePanel } from '../../commerce/panel/commerce-panel';
import type { InputsTileProps } from './inputs-tile.types';
import { resolveInputsTileStyle } from './inputs-tile-variants';

export function InputsTile({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-inputs-tile',
  onSelect,
  children,
}: InputsTileProps) {
  const formatted = value === undefined ? '' : mathPercent(value);
  const style = resolveInputsTileStyle(tone, size);
  const ariaLabel = collectionSlug(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-inputs-tile ui-element"
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
      <CommercePanel
        label="Commerce Panel"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default InputsTile;
