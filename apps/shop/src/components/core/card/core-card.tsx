import { collectionName } from '../../../utils/collection/collection-name';
import { formatPercent } from '../../../utils/format/format-percent';
import { storageSlug } from '../../../utils/storage/storage-slug';
import { CoreBadge } from '../badge/core-badge';
import type { CoreCardProps } from './core-card.types';
import { resolveCoreCardStyle } from './core-card-variants';

export function CoreCard({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-core-card',
  onSelect,
  children,
}: CoreCardProps) {
  const formatted = value === undefined ? '' : collectionName(value);
  const style = resolveCoreCardStyle(tone, size);
  const ariaLabel = storageSlug(formatPercent(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-core-card ui-element"
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
      <CoreBadge label="Core Badge" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default CoreCard;
