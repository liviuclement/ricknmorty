import React, { ChangeEvent } from 'react';

interface Props {
    options: { label: string, value: number }[],
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void,
}

const CustomSelect = (props: Props) => {
    const { options, onChange } = props;

    const mapOptions = () => options.map(option => (
        <option
            key={`${option.label}-${option.value}`}
            value={option.value}
        >
            {option.label}
        </option>
    ))

    return (
        <select
            onChange={onChange}
        >
            {mapOptions()}
        </select>
    );
};

export default CustomSelect;
