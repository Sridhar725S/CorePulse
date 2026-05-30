export default function Topbar() {

  return (

    <div className="topbar">

      {/* LEFT */}
      <div>

        <h1 className="
          text-3xl
          font-bold
          text-white
        ">
          CorePulse
        </h1>

        <p className="
          text-sm
          text-cyan-300/70
        ">
          Realtime System Intelligence
        </p>

      </div>

      {/* RIGHT */}
      <div className="
        flex
        items-center
        gap-4
      ">

        <div className="
          px-4
          py-2
          rounded-2xl
          bg-cyan-400/10
          border
          border-cyan-400/20
          text-cyan-300
          text-sm
        ">
          LIVE
        </div>

      </div>

    </div>
  )
}