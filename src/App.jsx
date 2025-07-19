import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [target, setTarget] = useState("");
  const [diff, setDiff] = useState(0);
  const id = useRef(null);

  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  function handleSubmit() {
    if (!target) return;
    clearInterval(id.current); // clear any previous
    id.current = setInterval(() => {
      const distance = new Date(target) - new Date();
      setDiff(distance);
    }, 1000);
  }

  useEffect(() => {
    if (diff <= 0) {
      clearInterval(id.current);
      setDays("00");
      setHours("00");
      setMinutes("00");
      setSeconds("00");
    } else {
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setDays(String(d).padStart(2, "0"));
      setHours(String(h).padStart(2, "0"));
      setMinutes(String(m).padStart(2, "0"));
      setSeconds(String(s).padStart(2, "0"));
    }
  }, [diff]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="datetime-local"
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 cursor-pointer"
          onClick={handleSubmit}
        >
          Start
        </button>
      </div>

      <div className="flex gap-6 text-center mt-8">
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-gray-800">{days}</span>
          <span className="text-gray-600">Days</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-gray-800">{hours}</span>
          <span className="text-gray-600">Hours</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-gray-800">{minutes}</span>
          <span className="text-gray-600">Minutes</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-gray-800">{seconds}</span>
          <span className="text-gray-600">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default App;
