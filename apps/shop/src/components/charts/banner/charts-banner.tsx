import { mathSlug } from '../../../utils/math/math-slug';
import { i18nAddress } from '../../../utils/i18n/i18n-address';
import { storageDate } from '../../../utils/storage/storage-date';
import type { ChartsBannerProps } from './charts-banner.types';
import { resolveChartsBannerStyle } from './charts-banner-variants';

export function ChartsBanner({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-charts-banner',
  onSelect,
  children,
}: ChartsBannerProps) {
  const formatted = value === undefined ? '' : mathSlug(value);
  const style = resolveChartsBannerStyle(tone, size);
  const ariaLabel = storageDate(i18nAddress(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-charts-banner ui-element"
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

export default ChartsBanner;
