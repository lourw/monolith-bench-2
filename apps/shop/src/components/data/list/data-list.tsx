import { storagePhone } from '../../../utils/storage/storage-phone';
import { FormsTile } from '../../forms/tile/forms-tile';
import type { DataListProps } from './data-list.types';
import { resolveDataListStyle } from './data-list-variants';

export function DataList({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-data-list',
  onSelect,
  children,
}: DataListProps) {
  const formatted = value === undefined ? '' : storagePhone(value);
  const style = resolveDataListStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-data-list ui-element"
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
      <FormsTile label="Forms Tile" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default DataList;
