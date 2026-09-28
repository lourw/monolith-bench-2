import { storageAddress } from '../../../utils/storage/storage-address';
import { formatAddress } from '../../../utils/format/format-address';
import { FormsBanner } from '../../forms/banner/forms-banner';
import type { DataBadgeProps } from './data-badge.types';
import { resolveDataBadgeStyle } from './data-badge-variants';

export function DataBadge({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-data-badge',
  onSelect,
  children,
}: DataBadgeProps) {
  const formatted = value === undefined ? '' : storageAddress(value);
  const style = resolveDataBadgeStyle(tone, size);
  const ariaLabel = formatAddress(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-data-badge ui-element"
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
      <FormsBanner label="Forms Banner" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default DataBadge;
