import classes from './Stack.module.css';

const Stack = ({ data }) => {
    return (
        <div className={classes.stackWrapper}>
        <div className={classes.stack}>
            <div className={classes.stackTitle}>
                {data.name}
            </div>
            <div className={classes.stackContent}>
                {Array(22).fill('test').map(ele => <p>{ele}</p>)}
            </div>
        </div>
        </div>
    );
}

export default Stack
