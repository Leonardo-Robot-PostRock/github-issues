import React, { useMemo } from 'react';
import Select, { SingleValue } from 'react-select';
import { FiChevronLeft, FiChevronRight, FiSkipBack } from 'react-icons/fi';
import { Button } from '../../shared';

interface Props {
    page: number;
    perPage: number;
    setPerPage: (n: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    setPage: (n: number) => void;
    hasNext?: boolean;
    hasPrev?: boolean;
}

const wrapperCls = 'flex flex-col sm:flex-row items-center gap-3 m-2 p-2    rounded-lg';
const controlsCls = 'flex items-center gap-2';
const pageCls = 'px-3 py-2 text-sm text-gray-300 flex items-center gap-2 justify-center';

export const Pagination: React.FC<Props> = ({ page, perPage, setPerPage, nextPage, prevPage, setPage, hasNext = false, hasPrev = false }) => {
    const options = useMemo(() => [
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 20, label: '20' },
        { value: 50, label: '50' },
    ], []);

    const customStyles = useMemo(() => ({
        control: (provided: any) => ({
            ...provided,
            background: '#0f172a',
            border: '1px solid rgba(255,255,255,0.06)',
            minHeight: '36px',
            boxShadow: 'none',
        }),
        singleValue: (provided: any) => ({ ...provided, color: '#fff' }),
        menu: (provided: any) => ({ ...provided, background: '#0f172a' }),
        option: (provided: any, state: any) => ({
            ...provided,
            background: state.isFocused ? 'rgba(59,130,246,0.12)' : 'transparent',
            color: '#fff',
        }),
    }), []);

    return (
        <div className={wrapperCls}>
            <div className='flex items-center gap-3 w-full sm:w-auto'>
                <label className='text-sm text-gray-400'>Items por página</label>
                <div className='w-28 sm:w-20'>
                    <Select
                        value={options.find((o) => o.value === perPage)}
                        onChange={(opt: SingleValue<{ value: number; label: string }>) => setPerPage(opt?.value ?? perPage)}
                        options={options}
                        styles={customStyles}
                        isSearchable={false}
                        menuPlacement='auto'
                    />
                </div>
            </div>

            <div className='w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2 mt-3 sm:mt-0'>
                <div className={controlsCls}>
                    <Button onClick={() => setPage(1)} ariaLabel='Primera página' title='Ir al inicio' disabled={page === 1}>
                        <FiSkipBack size={16} />
                    </Button>

                    <Button onClick={prevPage} ariaLabel='Página anterior' title='Anterior' disabled={!hasPrev}>
                        <FiChevronLeft size={16} />
                    </Button>
                </div>

                <div className={pageCls}>
                    <span className='sr-only'>Página actual</span>
                    <span className='font-semibold'>{page}</span>
                </div>

                <div className={controlsCls}>
                    <Button onClick={nextPage} ariaLabel='Página siguiente' title='Siguiente' disabled={!hasNext}>
                        <FiChevronRight size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
