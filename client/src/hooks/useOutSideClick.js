import { useEffect, useRef } from "react";

export default function useOutSideClick(ref, callback, when) {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, []);

    function handler(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            savedCallback.current();
        }
    };

    useEffect(() => {
        if (when) {
            document.addEventListener('click', handler);
            return () => {
                document.removeEventListener('click', handler);
            }
        }
    }, [when])

}