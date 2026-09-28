import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthOverviewPage } from './auth-overview-page';
import { AuthOverviewSummary } from './auth-overview-summary';
import {
  AUTH_OVERVIEW_FEATURE,
  AUTH_OVERVIEW_ROUTE,
} from './auth-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[AUTH_OVERVIEW_ROUTE]}>
      <AuthOverviewPage />
    </MemoryRouter>,
  );
}

describe('AuthOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(AUTH_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      AUTH_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${AUTH_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(AUTH_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${AUTH_OVERVIEW_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${AUTH_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${AUTH_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${AUTH_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${AUTH_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${AUTH_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AuthOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<AuthOverviewSummary />);
    expect(
      screen.getByTestId(`${AUTH_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
