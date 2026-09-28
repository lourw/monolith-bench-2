import { i18nNumber } from '../../../utils/i18n/i18n-number';
import { storageCode } from '../../../utils/storage/storage-code';
import { validateSlug } from '../../../utils/validate/validate-slug';
import { LayoutChip } from '../../layout/chip/layout-chip';
import type { NavigationBadgeProps } from './navigation-badge.types';
import { resolveNavigationBadgeStyle } from './navigation-badge-variants';

export function NavigationBadge({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-navigation-badge',
  onSelect,
  children,
}: NavigationBadgeProps) {
  const formatted = value === undefined ? '' : i18nNumber(value);
  const style = resolveNavigationBadgeStyle(tone, size);
  const ariaLabel = validateSlug(storageCode(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-navigation-badge ui-element"
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
      <LayoutChip label="Layout Chip" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default NavigationBadge;
