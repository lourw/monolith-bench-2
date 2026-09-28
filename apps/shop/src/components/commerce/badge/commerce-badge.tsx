import { storagePercent } from '../../../utils/storage/storage-percent';
import { asyncPercent } from '../../../utils/async/async-percent';
import { DataPanel } from '../../data/panel/data-panel';
import type { CommerceBadgeProps } from './commerce-badge.types';
import { resolveCommerceBadgeStyle } from './commerce-badge-variants';

export function CommerceBadge({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-commerce-badge',
  onSelect,
  children,
}: CommerceBadgeProps) {
  const formatted = value === undefined ? '' : storagePercent(value);
  const style = resolveCommerceBadgeStyle(tone, size);
  const ariaLabel = asyncPercent(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-commerce-badge ui-element"
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
      <DataPanel label="Data Panel" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default CommerceBadge;
