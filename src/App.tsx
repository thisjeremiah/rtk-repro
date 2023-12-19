import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAQuery } from "./app/services/a";
import { useGetBQuery } from "./app/services/b";

function App() {
  return (
    <Debuggable>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          height: "100%",
          width: "100%",
          padding: "8px",
        }}
      >
        <A />
        <B />
        <C />
      </div>
    </Debuggable>
  );
}

// A will not trigger additional re-renders after the initial 2 renders.
// This is because we are explicitly selecting only `data` from the result, which does not change.
// Note: without `selectFromResult`, it would render 2x per second.
function A() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const { data } = useGetAQuery(undefined, {
    pollingInterval: 1_000,
    selectFromResult(result) {
      return { data: result.data };
    },
  });

  return (
    <Debuggable>
      <div style={{ padding: 8 }}>
        A | Data: [{data?.join(", ")}] Render count: {renderCount.current}
      </div>
    </Debuggable>
  );
}

// B will render 2x per second because:
// - `selectFromResult` is getting called 2x per second.
// - This is due to the 1 second polling for query A.
function B() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const { data } = useGetBQuery(undefined, {
    selectFromResult(result) {
      return {
        // Returning an unstable reference here to force a re-render
        // to demonstrate how often `selectFromResult` is running.
        data: [...(result.data ?? [])],
      };
    },
    pollingInterval: 5_000,
  });

  return (
    <Debuggable>
      <div style={{ padding: 8 }}>
        B | Data: [{data?.join(", ")}] Render count: {renderCount.current}
      </div>
    </Debuggable>
  );
}

// Click C to trigger a count increment, which will also cause a re-render of B.
function C() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const stateC: any = useSelector<any>((state) => state.c);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch({ type: "INCREMENT_C" });
  };

  return (
    <Debuggable>
      <div style={{ padding: 8 }} onClick={onClick}>
        C | Data: [{stateC.count}] Render count: {renderCount.current}
      </div>
    </Debuggable>
  );
}

function Debuggable({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ outline: `2px solid ${getRandomColor()}` }}>{children}</div>
  );
}

export default App;

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
