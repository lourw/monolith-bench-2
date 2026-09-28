import { CoreBanner } from './core-banner';
import type { CoreBannerGroupProps, CoreBannerItem } from './core-banner.types';
import { toneFromValue } from './core-banner-variants';

export function CoreBannerGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-core-banner-group',
  onSelect,
}: CoreBannerGroupProps) {
  const handleSelect = (item: CoreBannerItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CoreBanner
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

export default CoreBannerGroup;
