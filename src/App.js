import "./App.css";
import { useState } from "react";

function App() {
  const [amount, setAmount] = useState(0);
  const [yourTip, setYourTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);

  const averageTipPercent = (yourTip + friendTip) / 2;

  // const tipAmount = Math.round((amount / 100) * averageTipPercent, 2);

  const tipValue = Number((amount / 100) * averageTipPercent);
  const tipAmount = Number(tipValue);

  function handleChange(e) {
    setAmount(Number(e.target.value));
  }

  function handleReset() {
    setAmount(0);
    setYourTip(0);
    setFriendTip(0);
  }

  return (
    <div>
      <Amount onChange={handleChange} amount={amount}>
        <p>How much was the bill?</p>
      </Amount>

      <Selector tipValue={yourTip} onSelect={setYourTip}>
        <p>How much tip would you like to give?</p>
      </Selector>

      <Selector tipValue={friendTip} onSelect={setFriendTip}>
        <p>How much tip would your friend like to give?</p>
      </Selector>

      {amount > 0 && (
        <Total
          amount={amount}
          averageTipPercent={averageTipPercent}
          tipAmount={tipAmount}
        />
      )}

      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
}

function Amount({ onChange, amount, children }) {
  return (
    <div>
      <p>{children}</p>
      <input type="number" step="0.01" value={amount} onChange={onChange} />
    </div>
  );
}

function Selector({ onChange, children, tipValue, onSelect }) {
  return (
    <div>
      <p>{children}</p>
      <select
        value={tipValue}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value={0}>0%</option>
        <option value={5}>5%</option>
        <option value={10}>10%</option>
        <option value={20}>20%</option>
      </select>
    </div>
  );
}

function Total({ children, amount, averageTipPercent, tipAmount }) {
  return (
    <div>
      {`Average tip was ${averageTipPercent}%`}
      <br />
      {`You pay $${amount + tipAmount} $${amount} + $${tipAmount} tip)`}
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

export default App;
