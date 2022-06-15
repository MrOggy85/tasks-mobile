import type { RootState } from './redux/store';

type Task = RootState['tasks']['tasks'][0];

function getPrio(prio: Task['priority']) {
  switch (prio) {
    case 2:
      return {
        bg: 'primary',
        content: 'Low',
      };
    case 3:
      return {
        bg: 'warning',
        content: 'Medium',
      };
    case 4:
      return {
        bg: 'danger',
        content: 'High',
      };
    case 0:
    case 1:
    default:
      return {
        bg: 'light',
        content: 'None',
      };
  }
}

export default getPrio;
