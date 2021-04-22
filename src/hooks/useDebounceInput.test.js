import { waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import useDebounceInput from './useDebounceInput';

const setup = (time, defaultValue) => {
    const { result } = renderHook(() => useDebounceInput(time, defaultValue));
    const [value, setValue] = result.current;
    return { result, value, setValue };
};

test('It should init the useDebounceInput hook', () => {
    const { value, setValue } = setup();
    expect(value).toBe("");
    expect(typeof setValue).toBe('function');
});

test('It should init the useDebounceInput hook with time', () => {
    const { value, setValue } = setup(200);
    expect(value).toBe("");
    expect(typeof setValue).toBe('function');
});

test('It should init the useDebounceInput hook with defaultValue', () => {
    const { value, setValue } = setup(200, "default");
    expect(value).toBe("default");
    expect(typeof setValue).toBe('function');
});

test('It should use the useDebounceInput hook, typing text', async () => {
    const { result, setValue } = setup(200);
    expect(typeof setValue).toBe('function');
    act(() => {
        setValue({ target: { value: "change" } });
        setValue({ target: { value: "changed" } });
    });
    await waitFor(() => {
        const [value] = result.current;
        expect(value).not.toBe("change");
        expect(value).toBe("changed");
    });
});
