import Particles from "react-tsparticles"

export default function ParticleBackground() {

  return (

    <Particles

      options={{

        background: {
          color: {
            value: "#050816"
          }
        },

        fpsLimit: 60,

        particles: {

          color: {
            value: "#00ffff"
          },

          links: {
            color: "#00ffff",
            distance: 120,
            enable: true,
            opacity: 0.15,
            width: 1
          },

          move: {
            enable: true,
            speed: 1
          },

          number: {
            value: 60
          },

          opacity: {
            value: 0.2
          },

          size: {
            value: 2
          }
        }
      }}

  className="fixed inset-0 pointer-events-none"
    />
  )
}