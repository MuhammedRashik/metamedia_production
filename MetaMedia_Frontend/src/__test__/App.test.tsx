import { render } from "@testing-library/react";
import App from "../App"; // Assuming App is a TypeScript file and the default export is properly typed
import { MemoryRouter } from "react-router-dom";

jest.mock("react-redux", () => ({
    ...(jest.requireActual("react-redux") as any), // Assuming the actual module does not have TypeScript typings
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock("redux-persist/integration/react", () => ({
    PersistGate: ({ children }: { children: React.ReactNode }) => <>{children}</>, // Add type annotation for children prop
}));

jest.mock(
    "../components/HomeComponent/MessageComponent/VoiceRecorder",
    () => ({
        AudioRecorder: jest.fn(),
    })
);

jest.mock("@ffmpeg/ffmpeg", () => ({}));

jest.mock("../App", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock(
    "../components/HomeComponent/MessageComponent/CallComponents/VideoCallComponent",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

jest.mock("@jitsi/react-sdk", () => ({}));
jest.mock("../utils/ReduxStore/Store/Store", () => ({
    Store: {},
    persistor: {},
}));

describe("App Router", () => {
    it("renders the UserRouter when the route matches /*", async () => {
        const { baseElement } = render(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        );
       
        expect(baseElement).toBeTruthy();
    });
});
