import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AddressesEditorPage } from './addresses-editor-page';
import { AddressesEditorSummary } from './addresses-editor-summary';
import {
  ADDRESSES_EDITOR_FEATURE,
  ADDRESSES_EDITOR_ROUTE,
} from './addresses-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ADDRESSES_EDITOR_ROUTE]}>
      <AddressesEditorPage />
    </MemoryRouter>,
  );
}

describe('AddressesEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ADDRESSES_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ADDRESSES_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ADDRESSES_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(ADDRESSES_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ADDRESSES_EDITOR_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ADDRESSES_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ADDRESSES_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ADDRESSES_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ADDRESSES_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ADDRESSES_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AddressesEditorSummary', () => {
  it('renders the summary block', () => {
    render(<AddressesEditorSummary />);
    expect(
      screen.getByTestId(`${ADDRESSES_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
