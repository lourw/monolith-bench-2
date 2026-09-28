import { asyncText } from '../../../utils/async/async-text';
import { asyncNumber } from '../../../utils/async/async-number';
import { collectionNumber } from '../../../utils/collection/collection-number';
import { NavigationStat } from '../../navigation/stat/navigation-stat';
import type { DataHeaderProps } from './data-header.types';
import { resolveDataHeaderStyle } from './data-header-variants';

export function DataHeader({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-data-header',
  onSelect,
  children,
}: DataHeaderProps) {
  const formatted = value === undefined ? '' : asyncText(value);
  const style = resolveDataHeaderStyle(tone, size);
  const ariaLabel = collectionNumber(asyncNumber(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-data-header ui-element"
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
      <NavigationStat
        label="Navigation Stat"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default DataHeader;
