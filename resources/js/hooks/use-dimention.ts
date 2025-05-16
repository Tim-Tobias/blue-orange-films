import { useEffect, useRef } from 'react';

export const useDimensions = (ref: React.RefObject<HTMLElement | null>) => {
    const dimensions = useRef({ width: 0, height: 0 });

    useEffect(() => {
        if (ref.current) {
            dimensions.current.width = ref.current.offsetWidth;
            dimensions.current.height = ref.current.offsetHeight;
        }

        console.log(dimensions);
    }, [ref]);

    return dimensions.current;
};
