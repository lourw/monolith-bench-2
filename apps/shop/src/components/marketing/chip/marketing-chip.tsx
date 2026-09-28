import { mathAddress } from '../../../utils/math/math-address';
import { i18nSlug } from '../../../utils/i18n/i18n-slug';
import type { MarketingChipProps } from './marketing-chip.types';
import { resolveMarketingChipStyle } from './marketing-chip-variants';

export function MarketingChip({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-marketing-chip',
  onSelect,
  children,
}: MarketingChipProps) {
  const formatted = value === undefined ? '' : mathAddress(value);
  const style = resolveMarketingChipStyle(tone, size);
  const ariaLabel = i18nSlug(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-marketing-chip ui-element"
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

export default MarketingChip;
