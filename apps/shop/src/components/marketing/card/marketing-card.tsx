import { validateCurrency } from '../../../utils/validate/validate-currency';
import { formatAddress } from '../../../utils/format/format-address';
import type { MarketingCardProps } from './marketing-card.types';
import { resolveMarketingCardStyle } from './marketing-card-variants';

export function MarketingCard({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-marketing-card',
  onSelect,
  children,
}: MarketingCardProps) {
  const formatted = value === undefined ? '' : validateCurrency(value);
  const style = resolveMarketingCardStyle(tone, size);
  const ariaLabel = formatAddress(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-marketing-card ui-element"
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

export default MarketingCard;
