import Screen1 from "./screen1";
import Screen2 from "./screen2";

export default function Both() {
  return (
    <div
      style={{ display: "flex", width: "100%", justifyContent: "space-around" }}
    >
      <Screen1 />
      <Screen2 />
    </div>
  );
}
