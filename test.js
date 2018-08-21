/** @jsx createElement */
import Keact, {createElement} from './keact';

const root = document.getElementById('root');
const elem = (
    <div className='test'>
        <div>Hello</div>
        <div>World</div>
    </div>
)
Keact.render(elem, root);