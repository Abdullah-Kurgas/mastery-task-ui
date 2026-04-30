const ScanningOverlay = ({
  fileName,
}: {
  fileName: string;
}): React.ReactElement => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500">
    <div className="relative group">
      <div className="absolute -inset-4 bg-blue-500/20 rounded-3xl blur-2xl animate-pulse"></div>

      <div className="relative w-64 h-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        <div className="p-8 space-y-4">
          <div className="h-3 w-3/4 bg-slate-100 rounded" />
          <div className="h-3 w-full bg-slate-100 rounded" />
          <div className="h-3 w-5/6 bg-slate-100 rounded" />
          <div className="pt-8 space-y-3">
            <div className="h-3 w-full bg-slate-50 rounded" />
            <div className="h-3 w-full bg-slate-50 rounded" />
            <div className="h-3 w-2/3 bg-slate-50 rounded" />
          </div>

          <div className="pt-6 grid grid-cols-3 gap-2">
            <div className="h-2 bg-blue-50 rounded" />
            <div className="h-2 bg-blue-50 rounded" />
            <div className="h-2 bg-blue-50 rounded" />
          </div>
        </div>

        <div className="absolute left-0 w-full h-1.5 bg-blue-500 shadow-[0_0_20px_5px_rgba(59,130,246,0.7)] animate-scan-manual z-20" />
      </div>
    </div>

    <div className="mt-12 text-center text-white">
      <h2 className="text-2xl font-bold tracking-tight">Processing Document</h2>
      <p className="text-blue-200 mt-2 font-medium opacity-80  text-md">
        Analyzing {fileName}
      </p>
    </div>
  </div>
);

export default ScanningOverlay;
