import { collectionDate } from '../../../utils/collection/collection-date';
import { NavigationBanner } from '../../navigation/banner/navigation-banner';
import type { DataChipProps } from './data-chip.types';
import { resolveDataChipStyle } from './data-chip-variants';

export function DataChip({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-data-chip',
  onSelect,
  children,
}: DataChipProps) {
  const formatted = value === undefined ? '' : collectionDate(value);
  const style = resolveDataChipStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-data-chip ui-element"
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
      <NavigationBanner
        label="Navigation Banner"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default DataChip;
