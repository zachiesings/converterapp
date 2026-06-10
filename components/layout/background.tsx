export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base soft gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/70 via-background to-background dark:from-indigo-950/40 dark:via-background dark:to-background" />

      {/* radial mesh glows */}
      <div className="absolute inset-0 opacity-70 dark:opacity-50 bg-[radial-gradient(60rem_40rem_at_15%_-10%,rgba(99,102,241,0.18),transparent),radial-gradient(50rem_36rem_at_90%_10%,rgba(168,85,247,0.16),transparent),radial-gradient(48rem_34rem_at_60%_100%,rgba(34,211,238,0.14),transparent)]" />

      {/* floating colorful blobs */}
      <div className="absolute -top-32 -left-24 h-[30rem] w-[30rem] rounded-full bg-indigo-400/30 dark:bg-indigo-600/25 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-28 h-[28rem] w-[28rem] rounded-full bg-violet-400/30 dark:bg-violet-600/20 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-[-6rem] left-1/4 h-[26rem] w-[26rem] rounded-full bg-cyan-300/30 dark:bg-cyan-500/15 blur-3xl animate-blob [animation-delay:-12s]" />
      <div className="absolute top-1/4 left-1/2 h-72 w-72 rounded-full bg-pink-300/25 dark:bg-pink-500/15 blur-3xl animate-blob [animation-delay:-9s]" />

      {/* subtle dotted pattern */}
      <div className="absolute inset-0 bg-dots text-slate-900/[0.04] dark:text-white/[0.05]" />
    </div>
  );
}
