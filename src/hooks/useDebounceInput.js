import { useEffect, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

const useDebounceInput = (time = 0, defaultValue = "") => {
    const [value, setValue] = useState(defaultValue);
    const [observable$] = useState(() => new Subject());
    useEffect(() => {
        const subject = observable$.pipe(
            map(event => event.target.value),
            debounceTime(time),
            distinctUntilChanged(),
        ).subscribe(setValue);
        return () => subject.unsubscribe();
    }, [time, observable$]);
    return [value, (event) => observable$.next(event)];
}

export default useDebounceInput;