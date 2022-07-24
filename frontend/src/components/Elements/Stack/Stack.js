import classes from './Stack.module.css';

const Stack = ({ data }) => {
    return (
        <div className={classes.stack}>
            <p>{data.name}</p>
        </div>
    );
}

export default Stack
