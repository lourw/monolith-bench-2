import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReturnsOverviewPage } from './returns-overview-page';
import { ReturnsOverviewSummary } from './returns-overview-summary';
import {
  RETURNS_OVERVIEW_FEATURE,
  RETURNS_OVERVIEW_ROUTE,
} from './returns-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RETURNS_OVERVIEW_ROUTE]}>
      <ReturnsOverviewPage />
    </MemoryRouter>,
  );
}

describe('ReturnsOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RETURNS_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RETURNS_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RETURNS_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(RETURNS_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${RETURNS_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${RETURNS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RETURNS_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${RETURNS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RETURNS_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RETURNS_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReturnsOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<ReturnsOverviewSummary />);
    expect(
      screen.getByTestId(`${RETURNS_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
