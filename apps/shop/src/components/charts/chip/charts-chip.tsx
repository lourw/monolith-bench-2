import { storageDate } from '../../../utils/storage/storage-date';
import { mathName } from '../../../utils/math/math-name';
import { CommerceList } from '../../commerce/list/commerce-list';
import type { ChartsChipProps } from './charts-chip.types';
import { resolveChartsChipStyle } from './charts-chip-variants';

export function ChartsChip({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-charts-chip',
  onSelect,
  children,
}: ChartsChipProps) {
  const formatted = value === undefined ? '' : storageDate(value);
  const style = resolveChartsChipStyle(tone, size);
  const ariaLabel = mathName(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-charts-chip ui-element"
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
      <CommerceList label="Commerce List" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default ChartsChip;
