import { useEffect, useRef, useState } from 'react';

const INTERVAL_VALUE = 1000;
const SHORT_INTERVAL = 100;

const isValueRounded = value => value % INTERVAL_VALUE < SHORT_INTERVAL;

export function useTimer(startStempValue) {
    const currentDate = +new Date();
    const [value, setValue] = useState((currentDate - startStempValue));

    const startStemp = useRef(startStempValue);
    const intervalId = useRef(null);
    const getValue = date => +date - startStemp.current;

    function startTimer() {
        clearInterval(intervalId.current);
        const value = getValue(+new Date()); // 2300 - 3000
        const isRoundedBeforeStart = isValueRounded(value); // false - true
        const interval = isRoundedBeforeStart ? INTERVAL_VALUE : INTERVAL_VALUE - value % 1000; // 700 - 1000
        intervalId.current = setInterval(() => {
            const value = getValue(+new Date()); // 3000 - 4000
            const isRounded = isValueRounded(value); // true - true
            if (isRounded !== isRoundedBeforeStart) {
                startTimer();
            }
            setValue(value);
        }, interval);
    }

    useEffect(() => {
        startTimer();
        return () => clearInterval(intervalId.current)
    }, []);

    return { value };
}