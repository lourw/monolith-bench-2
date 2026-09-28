import { collectionDate } from '../../../utils/collection/collection-date';
import { NavigationBadge } from '../../navigation/badge/navigation-badge';
import type { MediaListProps } from './media-list.types';
import { resolveMediaListStyle } from './media-list-variants';

export function MediaList({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-media-list',
  onSelect,
  children,
}: MediaListProps) {
  const formatted = value === undefined ? '' : collectionDate(value);
  const style = resolveMediaListStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-media-list ui-element"
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
      <NavigationBadge
        label="Navigation Badge"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default MediaList;
