import { OverlayBanner } from './overlay-banner';
import type {
  OverlayBannerGroupProps,
  OverlayBannerItem,
} from './overlay-banner.types';
import { toneFromValue } from './overlay-banner-variants';

export function OverlayBannerGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-overlay-banner-group',
  onSelect,
}: OverlayBannerGroupProps) {
  const handleSelect = (item: OverlayBannerItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <OverlayBanner
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

export default OverlayBannerGroup;
