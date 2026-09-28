import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SizingSettingsPage } from './sizing-settings-page';
import { SizingSettingsSummary } from './sizing-settings-summary';
import {
  SIZING_SETTINGS_FEATURE,
  SIZING_SETTINGS_ROUTE,
} from './sizing-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SIZING_SETTINGS_ROUTE]}>
      <SizingSettingsPage />
    </MemoryRouter>,
  );
}

describe('SizingSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SIZING_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SIZING_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SIZING_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(SIZING_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SIZING_SETTINGS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SIZING_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SIZING_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SIZING_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SIZING_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SIZING_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SizingSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<SizingSettingsSummary />);
    expect(
      screen.getByTestId(`${SIZING_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
