import { MouseEventHandler } from "react";
import Check from './../../assets/check.svg?react';
import styles from './Option.module.css';

type OptionProps = {
    option: string;
    selected?: boolean;
    onOptionClick: (value: string) => void;
};

export const Option = (props: OptionProps) => {
    const {
        option,
        onOptionClick,
        selected
    } = props;

    const handleOptionClick = (clickedValue: string): MouseEventHandler<HTMLLIElement> =>
        () => {
            onOptionClick(clickedValue);
        };

    return (
        <li
            className={styles.option}
            value={option}
            onClick={handleOptionClick(option)}
            data-selected={selected}
        >
            {option}
            {selected &&
                <span className={styles.checkIcon}>
                    <Check />
                </span>
            }
        </li>
    );
};