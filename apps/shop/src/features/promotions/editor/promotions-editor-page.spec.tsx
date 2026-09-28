import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PromotionsEditorPage } from './promotions-editor-page';
import { PromotionsEditorSummary } from './promotions-editor-summary';
import {
  PROMOTIONS_EDITOR_FEATURE,
  PROMOTIONS_EDITOR_ROUTE,
} from './promotions-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROMOTIONS_EDITOR_ROUTE]}>
      <PromotionsEditorPage />
    </MemoryRouter>,
  );
}

describe('PromotionsEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROMOTIONS_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROMOTIONS_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROMOTIONS_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(PROMOTIONS_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PROMOTIONS_EDITOR_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROMOTIONS_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROMOTIONS_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROMOTIONS_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROMOTIONS_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROMOTIONS_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PromotionsEditorSummary', () => {
  it('renders the summary block', () => {
    render(<PromotionsEditorSummary />);
    expect(
      screen.getByTestId(`${PROMOTIONS_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
