import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import classes from './BoardPage.module.css';
import uniCss from '../pagesuniversal.module.css';

function BoardPage() {
  const { boardId } = useParams();
  let stacks;

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!stacks) {
        // await dispatch(authenticate());
        setLoaded(true);
      }
    })();
  }, [dispatch]);

  if (!loaded) return null;

  return (
    <div className={uniCss.mainContainer}>
      <h1>BoardPage #{boardId}</h1>
    </div>
  );
}

export default BoardPage;
