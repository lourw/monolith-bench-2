import { i18nSlug } from '../../../utils/i18n/i18n-slug';
import { storagePercent } from '../../../utils/storage/storage-percent';
import type { InputsBannerProps } from './inputs-banner.types';
import { resolveInputsBannerStyle } from './inputs-banner-variants';

export function InputsBanner({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-inputs-banner',
  onSelect,
  children,
}: InputsBannerProps) {
  const formatted = value === undefined ? '' : i18nSlug(value);
  const style = resolveInputsBannerStyle(tone, size);
  const ariaLabel = storagePercent(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-inputs-banner ui-element"
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

export default InputsBanner;
