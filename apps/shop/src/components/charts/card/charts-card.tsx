import { storageDate } from '../../../utils/storage/storage-date';
import { LayoutBadge } from '../../layout/badge/layout-badge';
import type { ChartsCardProps } from './charts-card.types';
import { resolveChartsCardStyle } from './charts-card-variants';

export function ChartsCard({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-charts-card',
  onSelect,
  children,
}: ChartsCardProps) {
  const formatted = value === undefined ? '' : storageDate(value);
  const style = resolveChartsCardStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-charts-card ui-element"
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
      <LayoutBadge label="Layout Badge" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default ChartsCard;
