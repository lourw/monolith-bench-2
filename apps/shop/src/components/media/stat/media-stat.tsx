import { storageSlug } from '../../../utils/storage/storage-slug';
import { collectionCode } from '../../../utils/collection/collection-code';
import { FormsCard } from '../../forms/card/forms-card';
import type { MediaStatProps } from './media-stat.types';
import { resolveMediaStatStyle } from './media-stat-variants';

export function MediaStat({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-media-stat',
  onSelect,
  children,
}: MediaStatProps) {
  const formatted = value === undefined ? '' : storageSlug(value);
  const style = resolveMediaStatStyle(tone, size);
  const ariaLabel = collectionCode(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-media-stat ui-element"
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
      <FormsCard label="Forms Card" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default MediaStat;
