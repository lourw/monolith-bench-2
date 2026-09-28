import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SizingListPage } from './sizing-list-page';
import { SizingListSummary } from './sizing-list-summary';
import { SIZING_LIST_FEATURE, SIZING_LIST_ROUTE } from './sizing-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SIZING_LIST_ROUTE]}>
      <SizingListPage />
    </MemoryRouter>,
  );
}

describe('SizingListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(SIZING_LIST_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SIZING_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SIZING_LIST_FEATURE.testId}-row`),
    ).toHaveLength(SIZING_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SIZING_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SIZING_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${SIZING_LIST_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${SIZING_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SIZING_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SIZING_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SizingListSummary', () => {
  it('renders the summary block', () => {
    render(<SizingListSummary />);
    expect(
      screen.getByTestId(`${SIZING_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
