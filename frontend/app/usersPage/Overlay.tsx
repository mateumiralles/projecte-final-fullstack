import OverlayPanel from "./OverlayPanel";

type OverlayProps = {
  bool: Boolean;
  toggleFunction: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OverlayContainer(props: OverlayProps) {
  return (
    <div
      className={`absolute left-1/2 top-0 z-20 h-full w-1/2 overflow-hidden  transition duration-500 ease-in-out ${
        props.bool !== true ? "color-white -translate-x-full bg-black" : null
      }`}
    >
      <div
        className={`relative -left-full h-full w-[200%] translate-x-0 transition duration-500 ease-in-out ${
          props.bool !== true ? "color-white translate-x-1/2 bg-black" : null
        }`}
      >
        {/* -- LEFT OVERLAY PANEL -- */}
        <OverlayPanel
          position={1}
          title="Hello, Friend!"
          text="Enter your personal details and start a journey with us. You won't regret it!"
          button="SIGN UP"
          bool={props.bool}
          toggleFunction={props.toggleFunction}
        />

        {/* -- RIGHT OVERLAY PANEL -- */}
        <OverlayPanel
          position={2}
          title="Welcome back!"
          text="To keep connected with us and get more functionalities login with your personal info"
          button="LOG IN"
          bool={props.bool}
          toggleFunction={props.toggleFunction}
        />
      </div>
    </div>
  );
}
