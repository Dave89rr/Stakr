import classes from './CardInfoModal.module.css';

const CardInfoModal = ({ cardModal, data }) => {
    return (
        <>
            <div className={classes.background} style={{display: (!cardModal?'none':'block')}}></div>
            <div className={classes.container} style={{display: (!cardModal?'none':'flex')}}>
                <div className={classes.infoContainer}>
                    <section className={`${classes.modalCap} ${classes[data.color]}`}>
                    </section>
                </div>
            </div>
        </>
    );
}

export default CardInfoModal;
