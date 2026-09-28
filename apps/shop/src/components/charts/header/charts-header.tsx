import { storageDate } from '../../../utils/storage/storage-date';
import type { ChartsHeaderProps } from './charts-header.types';
import { resolveChartsHeaderStyle } from './charts-header-variants';

export function ChartsHeader({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-charts-header',
  onSelect,
  children,
}: ChartsHeaderProps) {
  const formatted = value === undefined ? '' : storageDate(value);
  const style = resolveChartsHeaderStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-charts-header ui-element"
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

export default ChartsHeader;
