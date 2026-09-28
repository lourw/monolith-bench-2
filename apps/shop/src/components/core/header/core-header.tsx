import { storageSlug } from '../../../utils/storage/storage-slug';
import { storagePhone } from '../../../utils/storage/storage-phone';
import { validatePhone } from '../../../utils/validate/validate-phone';
import { CoreBanner } from '../banner/core-banner';
import type { CoreHeaderProps } from './core-header.types';
import { resolveCoreHeaderStyle } from './core-header-variants';

export function CoreHeader({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-core-header',
  onSelect,
  children,
}: CoreHeaderProps) {
  const formatted = value === undefined ? '' : storageSlug(value);
  const style = resolveCoreHeaderStyle(tone, size);
  const ariaLabel = validatePhone(storagePhone(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-core-header ui-element"
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
      <CoreBanner label="Core Banner" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default CoreHeader;
