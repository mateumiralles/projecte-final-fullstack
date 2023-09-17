import OverlayPanel from "./OverlayPanel";

type OverlayProps = {
  bool: Boolean;
  toggleFunction: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OverlayContainer(props: OverlayProps) {
  return (
    <div
      className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition  duration-500 ease-in-out z-20 ${
        props.bool !== true ? "-translate-x-full bg-black color-white" : null
      }`}
    >
      <div
        className={`relative -left-full h-full w-[200%] transition translate-x-0 duration-500 ease-in-out ${
          props.bool !== true ? "translate-x-1/2 bg-black color-white" : null
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
