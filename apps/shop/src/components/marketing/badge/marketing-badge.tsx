import { formatPhone } from '../../../utils/format/format-phone';
import { validateAddress } from '../../../utils/validate/validate-address';
import { validatePhone } from '../../../utils/validate/validate-phone';
import { CommerceStat } from '../../commerce/stat/commerce-stat';
import type { MarketingBadgeProps } from './marketing-badge.types';
import { resolveMarketingBadgeStyle } from './marketing-badge-variants';

export function MarketingBadge({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-marketing-badge',
  onSelect,
  children,
}: MarketingBadgeProps) {
  const formatted = value === undefined ? '' : formatPhone(value);
  const style = resolveMarketingBadgeStyle(tone, size);
  const ariaLabel = validatePhone(validateAddress(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-marketing-badge ui-element"
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
      <CommerceStat label="Commerce Stat" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default MarketingBadge;
