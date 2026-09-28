import { validatePhone } from '../../../utils/validate/validate-phone';
import { FormsToolbar } from '../../forms/toolbar/forms-toolbar';
import type { DataBannerProps } from './data-banner.types';
import { resolveDataBannerStyle } from './data-banner-variants';

export function DataBanner({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-data-banner',
  onSelect,
  children,
}: DataBannerProps) {
  const formatted = value === undefined ? '' : validatePhone(value);
  const style = resolveDataBannerStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-data-banner ui-element"
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
      <FormsToolbar label="Forms Toolbar" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default DataBanner;
