import classes from './Workspace.module.css';
import uniCss from '../pagesuniversal.module.css';
import BoardCard from '../../Elements/BoardCard';

function Workspace() {
  return (
    <div className={uniCss.mainContainer}>
      <h1>Workspace</h1>
      <BoardCard />
      <BoardCard />
    </div>
  );
}

export default Workspace;
