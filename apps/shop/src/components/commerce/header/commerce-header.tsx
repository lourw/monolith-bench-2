import { formatNumber } from '../../../utils/format/format-number';
import { mathAddress } from '../../../utils/math/math-address';
import type { CommerceHeaderProps } from './commerce-header.types';
import { resolveCommerceHeaderStyle } from './commerce-header-variants';

export function CommerceHeader({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-commerce-header',
  onSelect,
  children,
}: CommerceHeaderProps) {
  const formatted = value === undefined ? '' : formatNumber(value);
  const style = resolveCommerceHeaderStyle(tone, size);
  const ariaLabel = mathAddress(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-commerce-header ui-element"
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

export default CommerceHeader;
