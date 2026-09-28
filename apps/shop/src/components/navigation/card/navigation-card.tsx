import { i18nNumber } from '../../../utils/i18n/i18n-number';
import { storagePercent } from '../../../utils/storage/storage-percent';
import type { NavigationCardProps } from './navigation-card.types';
import { resolveNavigationCardStyle } from './navigation-card-variants';

export function NavigationCard({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-navigation-card',
  onSelect,
  children,
}: NavigationCardProps) {
  const formatted = value === undefined ? '' : i18nNumber(value);
  const style = resolveNavigationCardStyle(tone, size);
  const ariaLabel = storagePercent(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-navigation-card ui-element"
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

export default NavigationCard;
