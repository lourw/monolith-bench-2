import { validateAddress } from '../../../utils/validate/validate-address';
import type { FormsTileProps } from './forms-tile.types';
import { resolveFormsTileStyle } from './forms-tile-variants';

export function FormsTile({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-forms-tile',
  onSelect,
  children,
}: FormsTileProps) {
  const formatted = value === undefined ? '' : validateAddress(value);
  const style = resolveFormsTileStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-forms-tile ui-element"
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

export default FormsTile;
