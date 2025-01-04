import ReactDOM from 'react-dom/client';
import 'tdesign-react/esm/style';

import App from './app';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);
