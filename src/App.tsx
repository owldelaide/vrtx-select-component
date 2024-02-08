import { useState } from "react";
import Select from "./components/Select/Select";
import styles from './App.module.css';

let options: string[] = [
    'options1_group_1',
    'options1_group_2',
    'options1_group_3',
];

let options2: string[] = [
    'options2_group_1',
    'options2_group_2',
    'options2_group_3',
];

let options3: string[] = [
    'options3_group_1',
    'options3_group_2',
    'options3_group_3',
];

const parentStyle = {
    width: '500px',
}

const App = () => {
    const [group, setGroup] = useState('');
    const [group2, setGroup2] = useState('');
    const [group3, setGroup3] = useState('');

    const handleGroupSelect = (value: string) => {
        setGroup(value);
        if (options.indexOf(value) === -1) // если нет такого элемента в массиве, добавляем
            options.push(value);
    };

    const handleDelete = () => {
        setGroup('');
        options = options.filter(item => item !== group);
    };

    const handleGroupSelect2 = (value: string) => {
        setGroup2(value);
        if (options2.indexOf(value) === -1)
            options2.push(value);
    };

    const handleDelete2 = () => {
        setGroup2('');
        options2 = options2.filter(item => item !== group2);
    };

    const handleGroupSelect3 = (value: string) => {
        setGroup3(value);
        if (options3.indexOf(value) === -1)
            options3.push(value);
    };

    const handleDelete3 = () => {
        setGroup3('');
        options3 = options3.filter(item => item !== group3);
    };

    return (
        <div
            style={parentStyle}
            className={styles.app}
        >
            <Select
                fieldName={'select'}
                options={options}
                selected={group}
                onChange={handleGroupSelect}
                onOptionDelete={handleDelete}
                label={'Группа обработки'}
                placeholder={'Укажите название'}
            />
            <Select
                fieldName={'select2'}
                options={options2}
                selected={group2}
                onChange={handleGroupSelect2}
                onOptionDelete={handleDelete2}
                label={'Группа обработки 2'}
                placeholder={'Укажите название'}
            />
            <Select
                fieldName={'select3'}
                options={options3}
                selected={group3}
                onChange={handleGroupSelect3}
                onOptionDelete={handleDelete3}
                label={'Группа обработки 3'}
                placeholder={'Укажите название'}
            />
        </div>
    )
}

export default App;