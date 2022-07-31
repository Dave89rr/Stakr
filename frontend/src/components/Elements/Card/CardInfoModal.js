import { useSelector } from 'react-redux';

import classes from './CardInfoModal.module.css';

const CardInfoModal = ({ cardModal, data, setCardModal }) => {
    const user = useSelector(state => state.session.user);

    return (
        <>
            <div
                className={classes.background}
                style={{display: (!cardModal?'none':'block')}}
            ></div>
            <div className={classes.container} style={{display: (!cardModal?'none':'flex')}}>
                <div className={classes.infoContainer}>
                    <section className={`${classes.modalCap} ${classes[data.color]}`}>
                        <span>{data.name}</span>
                        <img
                            onClick={() => setCardModal(false)}
                            className={classes.x}
                            src="/static/icons/x.svg"
                            alt="x"
                            style={{filter: (data.color==='Grey'?'invert(100%) sepia(0%) saturate(7500%) hue-rotate(171deg) brightness(99%) contrast(104%)':null)}}
                        />
                    </section>
                    <section className={classes.content}>
                        <div className={classes.descriptionContainer}>
                            <span className={classes.descriptionTitle}>Description:</span>
                            <span className={classes.description}>
                                {data.description}
                            </span>
                        </div>
                        <div className={classes.creditText}>Created by: {user.username}</div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default CardInfoModal;
