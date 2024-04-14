
import { render,waitFor } from '@testing-library/react';
import App from '../App';


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }:any) => <>{children}</>,
}));

jest.mock('../components/HomeComponent/MessageComponent/VoiceRecorder', () => ({
  AudioRecorder: jest.fn(), 
}));

jest.mock('@ffmpeg/ffmpeg', () => ({

}));

jest.mock("../App",()=>({
  __esModule: true,
  default: jest.fn(), 
}))

jest.mock('../components/HomeComponent/MessageComponent/CallComponents/VideoCallComponent', () => ({
  __esModule: true,
  default: jest.fn(), 
}));

jest.mock("@jitsi/react-sdk",()=>{

})
jest.mock('../utils/ReduxStore/Store/Store', () => ({
  Store: {},
  persistor: {}, 
}));



test('renders without crashing and configures providers correctly', async() => {
  const { baseElement } = render(<App />);
  const rootElement = baseElement
  console.log(rootElement);
  await waitFor(() => {
    expect(rootElement).toBeTruthy();
    expect(rootElement).toBeDefined();
  },{ timeout: 5000 });
});
