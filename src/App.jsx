import { useState, useMemo } from "react";

export default function App() {
  const [ethPool, setEthPool] = useState(100);
  const [usdcPool, setUsdcPool] = useState(200000);
  const [amountIn, setAmountIn] = useState("");

  const fee = 0.003;
  const k = ethPool * usdcPool;

  const outputAmount = useMemo(() => {
    if (!amountIn || amountIn <= 0) return 0;

    const amountAfterFee = amountIn * (1 - fee);
    const newEthPool = ethPool + Number(amountAfterFee);
    const newUsdcPool = k / newEthPool;

    return usdcPool - newUsdcPool;
  }, [amountIn, ethPool, usdcPool]);

  const handleSwap = () => {
    if (!amountIn || amountIn <= 0) return;

    const amountAfterFee = amountIn * (1 - fee);
    const newEthPool = ethPool + Number(amountAfterFee);
    const newUsdcPool = k / newEthPool;

    setEthPool(newEthPool);
    setUsdcPool(newUsdcPool);
    setAmountIn("");
  };

  const price = usdcPool / ethPool;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
      <div className="bg-gray-900 p-6 rounded-2xl w-[420px] shadow-2xl">

        <h1 className="text-xl font-bold mb-4">Mini DEX Simulator</h1>

        {/* Pool Info */}
        <div className="bg-gray-800 p-4 rounded-xl mb-4">
          <p className="text-sm text-gray-400">Pool Liquidity</p>
          <p>ETH: {ethPool.toFixed(4)}</p>
          <p>USDC: {usdcPool.toFixed(2)}</p>
          <p className="text-sm text-indigo-400 mt-2">
            1 ETH = {price.toFixed(2)} USDC
          </p>
        </div>

        {/* Swap */}
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-sm text-gray-400 mb-2">Swap ETH → USDC</p>

          <div className="bg-gray-700 p-3 rounded-lg mb-3">
            <input
              type="number"
              value={amountIn}
              onChange={(e) => setAmountIn(Number(e.target.value))}
              placeholder="0.0"
              className="bg-transparent outline-none w-full text-lg"
            />
            <p className="text-sm text-gray-400">ETH</p>
          </div>

          <div className="text-center text-gray-500 mb-3">↓</div>

          <div className="bg-gray-700 p-3 rounded-lg mb-4">
            <p className="text-lg font-semibold">
              {outputAmount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400">USDC (estimated)</p>
          </div>

          <button
            onClick={handleSwap}
            className="w-full bg-indigo-600 hover:bg-indigo-500 p-3 rounded-xl font-semibold transition duration-200"
          >
            Swap
          </button>
        </div>
      </div>
    </div>
  );
}
