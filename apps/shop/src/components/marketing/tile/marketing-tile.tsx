import { i18nAddress } from '../../../utils/i18n/i18n-address';
import { asyncPhone } from '../../../utils/async/async-phone';
import { formatName } from '../../../utils/format/format-name';
import { TypographyBanner } from '../../typography/banner/typography-banner';
import type { MarketingTileProps } from './marketing-tile.types';
import { resolveMarketingTileStyle } from './marketing-tile-variants';

export function MarketingTile({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-marketing-tile',
  onSelect,
  children,
}: MarketingTileProps) {
  const formatted = value === undefined ? '' : i18nAddress(value);
  const style = resolveMarketingTileStyle(tone, size);
  const ariaLabel = formatName(asyncPhone(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-marketing-tile ui-element"
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
      <TypographyBanner
        label="Typography Banner"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default MarketingTile;
