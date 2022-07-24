import classes from './Stack.module.css';

const Stack = ({ data }) => {
    return (
        <div className={classes.stack}>
            <div className={classes.stackTitle}>
                {data.name}
            </div>
        </div>
    );
}

export default Stack
