import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PreordersSettingsPage } from './preorders-settings-page';
import { PreordersSettingsSummary } from './preorders-settings-summary';
import {
  PREORDERS_SETTINGS_FEATURE,
  PREORDERS_SETTINGS_ROUTE,
} from './preorders-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PREORDERS_SETTINGS_ROUTE]}>
      <PreordersSettingsPage />
    </MemoryRouter>,
  );
}

describe('PreordersSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PREORDERS_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PREORDERS_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PREORDERS_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(PREORDERS_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PREORDERS_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PREORDERS_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PREORDERS_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PREORDERS_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PREORDERS_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PREORDERS_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PreordersSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<PreordersSettingsSummary />);
    expect(
      screen.getByTestId(`${PREORDERS_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
