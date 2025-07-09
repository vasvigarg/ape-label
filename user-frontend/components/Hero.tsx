export const Hero = () => {
  return (
    <div className="pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Ape Label
          </span>
        </h1>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl rounded-full"></div>
          <p className="relative text-xl md:text-2xl text-gray-300 font-light leading-relaxed backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
            Your one stop destination to getting your{" "}
            <span className="text-purple-300 font-medium">data labelled</span>
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Decentralized</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Solana Powered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Fast & Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};
