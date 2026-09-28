import { i18nPhone } from '../../../utils/i18n/i18n-phone';
import { NavigationPanel } from '../panel/navigation-panel';
import type { NavigationTileProps } from './navigation-tile.types';
import { resolveNavigationTileStyle } from './navigation-tile-variants';

export function NavigationTile({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-navigation-tile',
  onSelect,
  children,
}: NavigationTileProps) {
  const formatted = value === undefined ? '' : i18nPhone(value);
  const style = resolveNavigationTileStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-navigation-tile ui-element"
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
      <NavigationPanel
        label="Navigation Panel"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default NavigationTile;
