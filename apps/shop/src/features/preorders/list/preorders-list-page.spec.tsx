import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PreordersListPage } from './preorders-list-page';
import { PreordersListSummary } from './preorders-list-summary';
import {
  PREORDERS_LIST_FEATURE,
  PREORDERS_LIST_ROUTE,
} from './preorders-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PREORDERS_LIST_ROUTE]}>
      <PreordersListPage />
    </MemoryRouter>,
  );
}

describe('PreordersListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PREORDERS_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PREORDERS_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PREORDERS_LIST_FEATURE.testId}-row`),
    ).toHaveLength(PREORDERS_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${PREORDERS_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PREORDERS_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PREORDERS_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PREORDERS_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PREORDERS_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PREORDERS_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PreordersListSummary', () => {
  it('renders the summary block', () => {
    render(<PreordersListSummary />);
    expect(
      screen.getByTestId(`${PREORDERS_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
