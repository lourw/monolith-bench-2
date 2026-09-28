import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SizingOverviewPage } from './sizing-overview-page';
import { SizingOverviewSummary } from './sizing-overview-summary';
import {
  SIZING_OVERVIEW_FEATURE,
  SIZING_OVERVIEW_ROUTE,
} from './sizing-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SIZING_OVERVIEW_ROUTE]}>
      <SizingOverviewPage />
    </MemoryRouter>,
  );
}

describe('SizingOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SIZING_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SIZING_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SIZING_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(SIZING_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SIZING_OVERVIEW_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SIZING_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SIZING_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SIZING_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SIZING_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SIZING_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SizingOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<SizingOverviewSummary />);
    expect(
      screen.getByTestId(`${SIZING_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
