import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('It should allow the Search Component appears on document', async () => {
    render(<App />);
    await waitFor(() => {
        const search = screen.getByTestId('search');
        expect(search).toBeInTheDocument();
    });
});


