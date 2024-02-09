import styles from './App.module.css';
import Select from "./components/Select/Select";

const options: string[] = [
    'options1_group_1',
    'options1_group_2',
    'options1_group_3',
];

const options2: string[] = [
    'options2_group_1',
    'options2_group_2',
    'options2_group_3',
];

const options3: string[] = [
    'options3_group_1',
    'options3_group_2',
    'options3_group_3',
];

const parentStyle = {
    width: '500px',
};

const App = () => {
    return (
        <div
            style={parentStyle}
            className={styles.app}
        >
            <Select
                options={options}
                label={'Группа обработки'}
            />
            <Select
                options={options2}
                label={'Группа обработки 2'}
            />
            <Select
                options={options3}
                label={'Группа обработки 3'}
            />
        </div>
    )
}

export default App;