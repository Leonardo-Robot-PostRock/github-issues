import { useEffect } from 'react';

type FetchNext = () => void;

interface Options {
    containerRef: React.RefObject<HTMLElement> | null;
    enabled: boolean;
    fetchNext: FetchNext;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    threshold?: number; // pixels from bottom to trigger
}

export const useInfiniteScroll = ({ containerRef, enabled, fetchNext, hasNextPage, isFetchingNextPage, threshold = 8 }: Options) => {
    useEffect(() => {
        if (!enabled) return;
        const el = containerRef?.current;
        if (!el) return;

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const { scrollTop, clientHeight, scrollHeight } = el as HTMLElement;
                const atBottom = scrollTop + clientHeight >= scrollHeight - threshold;
                if (atBottom && hasNextPage && !isFetchingNextPage) {
                    fetchNext();
                }
                ticking = false;
            });
        };

        el.addEventListener('scroll', onScroll, { passive: true });
        return () => el.removeEventListener('scroll', onScroll);
    }, [containerRef, enabled, threshold]);
};

export default useInfiniteScroll;
