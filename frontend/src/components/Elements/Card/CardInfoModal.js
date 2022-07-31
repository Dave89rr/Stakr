import classes from './CardInfoModal.module.css';

const CardInfoModal = ({ cardModal, data, setCardModal }) => {
    return (
        <>
            <div
                className={classes.background}
                style={{display: (!cardModal?'none':'block')}}
            ></div>
            <div className={classes.container} style={{display: (!cardModal?'none':'flex')}}>
                <div className={classes.infoContainer}>
                    <section className={`${classes.modalCap} ${classes[data.color]}`}>

                        <img
                            onClick={() => setCardModal(false)}
                            className={classes.x}
                            src="/static/icons/x.svg"
                            alt="x"
                        />
                    </section>
                </div>
            </div>
        </>
    );
}

export default CardInfoModal;
