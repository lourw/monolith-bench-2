import { asyncCurrency } from '../../../utils/async/async-currency';
import { asyncSlug } from '../../../utils/async/async-slug';
import { NavigationBadge } from '../../navigation/badge/navigation-badge';
import type { DataToolbarProps } from './data-toolbar.types';
import { resolveDataToolbarStyle } from './data-toolbar-variants';

export function DataToolbar({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-data-toolbar',
  onSelect,
  children,
}: DataToolbarProps) {
  const formatted = value === undefined ? '' : asyncCurrency(value);
  const style = resolveDataToolbarStyle(tone, size);
  const ariaLabel = asyncSlug(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-data-toolbar ui-element"
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
      <NavigationBadge
        label="Navigation Badge"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default DataToolbar;
