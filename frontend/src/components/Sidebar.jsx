import {
  FiHome,
  FiCpu,
  FiBarChart2,
  FiSettings,
  FiActivity
} from 'react-icons/fi'

export default function Sidebar() {

  const menu = [

    {
      icon: <FiHome />,
      label: 'Dashboard'
    },

    {
      icon: <FiCpu />,
      label: 'Performance'
    },

    {
      icon: <FiBarChart2 />,
      label: 'Analytics'
    },

    {
      icon: <FiSettings />,
      label: 'Settings'
    }

  ]

  return (

 <div className="sidebar">

  <div className="
  w-16
  h-16
  rounded-2xl
  bg-cyan-500/10
  flex
  items-center
  justify-center
  text-cyan-400
  text-3xl
  mb-10
  ">
    <FiActivity />
  </div>

  <div className="
  flex
  flex-col
  gap-4
  w-full
  items-center
  ">

    {menu.map((item,index)=>(
      <button
        key={index}
        className="
        w-14
        h-14
        rounded-2xl
        bg-white/5
        text-white/70
        flex
        items-center
        justify-center
        text-2xl
        hover:bg-cyan-500/10
        hover:text-cyan-400
        transition-all
        duration-300
        "
      >
        {item.icon}
      </button>
    ))}

  </div>

  <div className="mt-auto">

    <div className="
    text-center
    text-xs
    text-gray-500
    ">
      v1.0
    </div>

  </div>

</div>
  )
}