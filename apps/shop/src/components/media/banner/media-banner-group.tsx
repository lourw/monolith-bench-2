import { MediaBanner } from './media-banner';
import type {
  MediaBannerGroupProps,
  MediaBannerItem,
} from './media-banner.types';
import { toneFromValue } from './media-banner-variants';

export function MediaBannerGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-media-banner-group',
  onSelect,
}: MediaBannerGroupProps) {
  const handleSelect = (item: MediaBannerItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MediaBanner
            key={item.id}
            label={item.label}
            value={item.value}
            size={size}
            tone={item.tone ?? toneFromValue(item.value)}
            testId={`${testId}-${item.id}`}
            onSelect={onSelect ? handleSelect(item) : undefined}
          />
        ))}
      </div>
      {items.length === 0 ? (
        <p className="ui-group-empty">Nothing to show</p>
      ) : null}
    </section>
  );
}

export default MediaBannerGroup;
